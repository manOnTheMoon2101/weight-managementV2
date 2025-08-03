import type { PageServerLoad } from './$types';
import { db } from '../../../lib/server/db';
import { nutrients } from '../../../lib/server/schema/index';
import { limits } from '../../../lib/server/schema/limits';
import { eq, and, gte, lte } from 'drizzle-orm';
import { auth } from '../../../lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, url }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
   
    if (!session?.user?.id) {
      throw redirect(302, '/login');
    }

    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    
    let actualStartDate = startDate;
    let actualEndDate = endDate;
    
    if (!startDate || !endDate) {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      
      actualStartDate = sevenDaysAgo.toISOString().split('T')[0];
      actualEndDate = today.toISOString().split('T')[0];
    }
    
    let whereCondition = and(
      eq(nutrients.userId, session.user.id),
      eq(nutrients.isActive, true),
      eq(nutrients.isDeleted, false)
    );

    if (actualStartDate && actualEndDate) {
      try {
        const start = new Date(actualStartDate);
        const end = new Date(actualEndDate);


        console.log(start)
        console.log(end)
        
        end.setHours(23, 59, 59, 999);
        
        whereCondition = and(
          whereCondition,
          gte(nutrients.createdAt, start),
          lte(nutrients.createdAt, end)
        );
      } catch (error) {
        console.error('Invalid date format:', error);
      }
    }
   
    const userNutrients = await db.query.nutrients.findMany({
      where: whereCondition,
      with: {
        supplements: true,
        health_tracker: true,
        sleep_schedule: true
      },
      orderBy: nutrients.createdAt,
    });

    const userLimits = await db.query.limits.findFirst({
      where: and(
        eq(limits.userId, session.user.id),
        eq(limits.isActive, true),
        eq(limits.isDeleted, false)
      ),
    });
   
    return {
      nutrients: userNutrients,
      limits:userLimits,
      dateRange: {
        startDate: actualStartDate,
        endDate: actualEndDate
      }
    };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
   
    console.error('Error fetching nutrients:', error);
    return {
      nutrients: [],
      dateRange: {
        startDate: null,
        endDate: null
      },
      error: 'Failed to load nutrients'
    };
  }
};
// src/routes/nutrients/+page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '../../../lib/server/db';
import { nutrients } from '../../../lib/server/schema/index';
import { eq, and } from 'drizzle-orm';
import { auth } from '../../../lib/server/auth'; 
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request }) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session?.user?.id) {
      throw redirect(302, '/login');
    }
    
    const userNutrients = await db.query.nutrients.findMany({
      where: and(
        eq(nutrients.userId, session.user.id),
        eq(nutrients.isActive, true),
        eq(nutrients.isDeleted, false)
      ),
      with: {
        supplements:true
      },
      orderBy: nutrients.createdAt,
    });
    
    return {
      nutrients: userNutrients
    };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
   
    console.error('Error fetching nutrients:', error);
    return {
      nutrients: [],
      error: 'Failed to load nutrients'
    };
  }
};
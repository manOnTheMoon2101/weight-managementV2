<div class="flex flex-col gap-1">
	Dashboard index page
	<div class="rounded-md border bg-card p-1 font-mono text-card-foreground">
		<Chart/>
		<Button href="/" class="w-fit" size="lg">Back to Home</Button>
		<Table columnDefs={columns} rowData={rows} />
	</div>
</div>


<script lang="ts">
import { Button } from "$lib/components/ui/button";
import Table from "./components/table/table.svelte"
import Chart from "./components/charts/chart.svelte"

const columns = [
        { headerName: 'Course', field: 'course' },
        { headerName: 'Instructor', field: 'instructor' },
        { headerName: 'Duration', field: 'duration' },
        { headerName: 'Location', field: 'location' },
        { headerName: 'Rating', field: 'rating' }
    ];

    const rows = [
        {
            course: 'JavaScript Basics',
            instructor: 'John Doe',
            duration: '5 hours',
            location: 'Delhi',
            rating: '3'
        },
        {
            course: 'Svelte Fundamentals',
            instructor: 'Jane Smith',
            duration: '3 hours',
            location: 'Delhi',
            rating: '2'
        },
        {
            course: 'Advanced React',
            instructor: 'Jake White',
            duration: '6 hours',
            location: 'Delhi',
            rating: '5'
        }
    ];
</script>
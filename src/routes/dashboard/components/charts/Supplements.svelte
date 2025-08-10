<script lang="ts">
    import { PieChart } from 'layerchart';

    // Dummy data for the pie chart
    const data = [
        { fruit: 'Apple', value: 35 },
        { fruit: 'Banana', value: 28 },
        { fruit: 'Orange', value: 22 },
        { fruit: 'Grape', value: 15 },
        { fruit: 'Strawberry', value: 12 },
        { fruit: 'Mango', value: 8 }
    ];

    // Alternative dummy data examples you can use:

    // Sales data
    const salesData = [
        { fruit: 'Q1 Sales', value: 125000 },
        { fruit: 'Q2 Sales', value: 98000 },
        { fruit: 'Q3 Sales', value: 145000 },
        { fruit: 'Q4 Sales', value: 167000 }
    ];

    // Market share data
    const marketShareData = [
        { fruit: 'Company A', value: 42.5 },
        { fruit: 'Company B', value: 28.3 },
        { fruit: 'Company C', value: 15.7 },
        { fruit: 'Company D', value: 8.2 },
        { fruit: 'Others', value: 5.3 }
    ];

    // Browser usage data
    const browserData = [
        { fruit: 'Chrome', value: 65.2 },
        { fruit: 'Safari', value: 18.8 },
        { fruit: 'Edge', value: 4.3 },
        { fruit: 'Firefox', value: 3.2 },
        { fruit: 'Others', value: 8.5 }
    ];
</script>

<div class="h-[300px] p-4 border rounded-sm resize overflow-auto">
    <PieChart {data} key="fruit" value="value" />
</div>

<!-- You can easily switch between different datasets: -->
<!-- <PieChart data={salesData} key="fruit" value="value" /> -->
<!-- <PieChart data={marketShareData} key="fruit" value="value" /> -->
<!-- <PieChart data={browserData} key="fruit" value="value" /> -->
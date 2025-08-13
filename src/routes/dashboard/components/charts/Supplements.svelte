<script lang="ts">
    import { PieChart } from "layerchart";
    let { data } = $props();
    
    const colors = ["#FF6B6B", "#FFD93D", "#FF8C42", "#9B59B6", "#F39C12"];
    
    const pieData = data[0] ? [
        { fruit: "Fat Burner", value: data[0].fatburnerCount, color: colors[0] },
        { fruit: "Multi Vitamin", value: data[0].multiVitaminCount, color: colors[1] },
        { fruit: "Magnesium", value: data[0].magnesiumCount, color: colors[2] }
    ] : [];
</script>

<div class="bg-background h-[300px] w-1/2 my-2">
    <h2 class="text-2xl font-bold text-center">Supplements</h2>
    <PieChart
        data={pieData}
        key="fruit"
        value="value"
        c="color"
        legend
    />
</div>
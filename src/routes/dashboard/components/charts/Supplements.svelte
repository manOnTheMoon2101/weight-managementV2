<script lang="ts">
    import { PieChart } from "layerchart";
    let { data } = $props();
    
    const colors = ["var(--accent)", "white", "var(--secondary)", "var(--background)", "var(--zen)"];
    
    const pieData = data[0] ? [
        { fruit: "Fat Burner", value: data[0].fatburnerCount, color: colors[0] },
        { fruit: "Multi Vitamin", value: data[0].multiVitaminCount, color: colors[1] },
        { fruit: "Magnesium", value: data[0].magnesiumCount, color: colors[2] },
        { fruit: "CLA", value: data[0].claCount, color: colors[3] },
        { fruit: "Zen", value: data[0].zenCount, color: colors[4] }
    ] : [];
</script>

<div class="h-[400px] w-1/2  bg-primary rounded-2xl p-4 flex flex-col justify-center items-center">
    <h4 class="text-accent font-bold  text-2xl text-center">Supplements</h4>
    <PieChart
        data={pieData}
        key="fruit"
        value="value"
        c="color"
        legend
    />
</div>
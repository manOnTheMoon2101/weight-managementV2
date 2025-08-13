<script lang="ts">
    import { PieChart } from "layerchart";
    
    const data = [
        { fruit: "L-Cartinine", value: 35, color: "#FF6B6B" },        
        { fruit: "CLA", value: 28, color: "#FFD93D" },       
        { fruit: "Multivitamins", value: 22, color: "#FF8C42" },       
        { fruit: "Magnesium", value: 15, color: "#9B59B6" },        
        { fruit: "Green Tea", value: 12, color: "#E74C3C" },       
    ];

    const colors = ["#FF6B6B", "#FFD93D", "#FF8C42", "#9B59B6", "#F39C12"];
</script>

<div class="bg-background h-[300px] w-1/2 my-4">
	<!-- <h2 class="text-2xl font-bold">Supplements</h2> -->
    <PieChart 
        {data} 
        key="fruit" 
        value="value" 
        c="color"
        legend 
    />
</div>
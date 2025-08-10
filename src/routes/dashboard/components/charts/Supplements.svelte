<script lang="ts">
    import { PieChart } from "layerchart";
    
    const data = [
        { fruit: "Apple", value: 35, color: "#FF6B6B" },        
        { fruit: "Banana", value: 28, color: "#FFD93D" },       
        { fruit: "Orange", value: 22, color: "#FF8C42" },       
        { fruit: "Grape", value: 15, color: "#9B59B6" },        
        { fruit: "Strawberry", value: 12, color: "#E74C3C" },   
        { fruit: "Mango", value: 49, color: "#F39C12" },       
    ];

    const colors = ["#FF6B6B", "#FFD93D", "#FF8C42", "#9B59B6", "#E74C3C", "#F39C12"];
</script>

<div class="bg-background h-[300px] w-1/2">
	<h2 class="text-2xl font-bold">Supplements</h2>
    <PieChart 
        {data} 
        key="fruit" 
        value="value" 
        c="color"
        legend 
    />
</div>
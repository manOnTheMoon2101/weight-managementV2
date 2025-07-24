<script lang="ts">
    import { onMount } from 'svelte';
    import {
        createGrid,
        ModuleRegistry,
        ClientSideRowModelModule,
        // Add these filter modules
        TextFilterModule,
        NumberFilterModule,
        DateFilterModule,
        type GridOptions,
        themeQuartz,
        colorSchemeDarkBlue
    } from 'ag-grid-community';
    

    
    // Register ALL the modules you need
    ModuleRegistry.registerModules([
        ClientSideRowModelModule,
        TextFilterModule,
        NumberFilterModule,
        DateFilterModule,
    ]);
    
    export let columnDefs: Array<any> = [];
    export let rowData: Array<any> = [];
    
    const darkTheme = themeQuartz.withPart(colorSchemeDarkBlue).withParams({
        backgroundColor: `var(--background)`,
        foregroundColor: `var(--foreground)`,
        headerBackgroundColor: `var(--accent)`,
        headerTextColor: '#cfd8dc',
        oddRowBackgroundColor: '#263299'
    });
    
    let gridDiv: HTMLDivElement;
    
    onMount(() => {
        const gridOptions: GridOptions<any> = {
            theme: darkTheme,
            columnDefs,
            rowData,
            defaultColDef: {
                sortable: true,
                filter: true,
                flex: 1
            }
        };
        
        if (gridDiv) {
            createGrid(gridDiv, gridOptions);
        }
    });
</script>

<div bind:this={gridDiv} style="height: 80vh; width: 100%;"></div>
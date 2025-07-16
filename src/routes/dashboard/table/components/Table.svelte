<script lang="ts">
    import { onMount } from 'svelte';
    import {
        createGrid,
        ModuleRegistry,
        ClientSideRowModelModule,
        type GridOptions,
        themeQuartz,
        colorSchemeDarkBlue
    } from 'ag-grid-community';

    // Register AG Grid Modules
    ModuleRegistry.registerModules([ClientSideRowModelModule]);

    export let columnDefs: Array<any> = [];
    export let rowData: Array<any> = [];

    // Create a custom dark theme using Theming API
    const darkTheme = themeQuartz.withPart(colorSchemeDarkBlue).withParams({
        backgroundColor: '#212121',
        foregroundColor: '#ffffff',
        headerBackgroundColor: '#37474f',
        headerTextColor: '#cfd8dc',
        oddRowBackgroundColor: '#263238'
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
                flex:1
                
            }
        };

        if (gridDiv) {
            createGrid(gridDiv, gridOptions);
        }
    });
</script>

<!-- Grid Container -->
<div bind:this={gridDiv} style="height: 400px; width: 100%;"></div>
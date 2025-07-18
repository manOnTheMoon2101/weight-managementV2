<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import { Button } from "$lib/components/ui/button";
   import X from "@lucide/svelte/icons/x"
   </script>
    
   <AlertDialog.Root>
    <AlertDialog.Trigger>Logout</AlertDialog.Trigger>
    <AlertDialog.Content>
     <AlertDialog.Header>
      <div class="flex flex-row justify-between items-center">
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Cancel class="text-red-800 hover:bg-red-800/40"><X /></AlertDialog.Cancel>
      </div>
      <!-- <AlertDialog.Description>
       This action cannot be undone. This will permanently delete your account
       and remove your data from our servers.
      </AlertDialog.Description> -->
     </AlertDialog.Header>
     <div class="flex flex-row justify-center">
        <AlertDialog.Footer>
            <Button href="/" class="w-fit" size="lg">Logout</Button>
           </AlertDialog.Footer>
     </div>
    </AlertDialog.Content>
   </AlertDialog.Root>
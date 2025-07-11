<script lang="ts">
  import Toggler from "./components/toggler.svelte";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import LogoutDialog from "./components/logout-dialog.svelte";
  import EditDialog from "./components/profile-edit.svelte"
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import { Button } from "$lib/components/ui/button";
  import { onMount } from "svelte";
  export let user: any;

  $: user = typeof user === "string" ? JSON.parse(user) : user;
  $: firstLetter = user?.name?.charAt(0);
</script>
    <div >

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>   <div class="flex flex-row items-center">
          <Avatar.Root class="mr-2">
            <Avatar.Fallback class="bg-amber-600">{firstLetter ?? "?"}</Avatar.Fallback>
          </Avatar.Root>
          <span>{user.name}</span>
        </div></DropdownMenu.Trigger>
        <DropdownMenu.Content>
         <DropdownMenu.Group>
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item closeOnSelect={false}><EditDialog user={user}/></DropdownMenu.Item>
          <DropdownMenu.Item closeOnSelect={false}>  <LogoutDialog/></DropdownMenu.Item>
          <DropdownMenu.Item closeOnSelect={false} class="flex flex-row justify-center"><Toggler/></DropdownMenu.Item>
         </DropdownMenu.Group>
        </DropdownMenu.Content>
       </DropdownMenu.Root>
       
    </div>
  
  


    

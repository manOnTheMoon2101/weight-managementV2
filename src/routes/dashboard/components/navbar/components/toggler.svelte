<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { toggleMode, setTheme } from "mode-watcher";
	import { Button } from "$lib/components/ui/button/index.js";
	import Palette from "@lucide/svelte/icons/palette";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	const THEME_STORAGE_KEY = "selectedTheme";
	const themes = ["", "redTheme", "purpleTheme", "greenTheme"];
	let currentThemeIndex = 0;

	function saveTheme(theme: string) {
		if (typeof window !== "undefined") {
			localStorage.setItem(THEME_STORAGE_KEY, theme);
		}
	}
	function loadTheme(): string {
		if (typeof window !== "undefined") {
			return localStorage.getItem(THEME_STORAGE_KEY) || "";
		}
		return "";
	}
	function setThemeWithStorage(theme: string) {
		setTheme(theme);
		saveTheme(theme);
		// Update current theme index
		currentThemeIndex = themes.indexOf(theme);
	}

	function cycleTheme() {
		currentThemeIndex = (currentThemeIndex + 1) % themes.length;
		const nextTheme = themes[currentThemeIndex];
		setThemeWithStorage(nextTheme);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.altKey && event.key.toLowerCase() === "t") {
			event.preventDefault();
			cycleTheme();
		}
	}

	onMount(() => {
		const savedTheme = loadTheme();
		if (savedTheme) {
			setTheme(savedTheme);
			currentThemeIndex = themes.indexOf(savedTheme);
		}

		if (typeof window !== "undefined") {
			const savedDarkMode = localStorage.getItem("dark-mode");
			if (savedDarkMode === "true" && !document.documentElement.classList.contains("dark")) {
				toggleMode();
			} else if (savedDarkMode === "false" && document.documentElement.classList.contains("dark")) {
				toggleMode();
			}

			// Add global keyboard event listener
			window.addEventListener("keydown", handleKeydown);
		}
	});

	onDestroy(() => {
		if (typeof window !== "undefined") {
			window.removeEventListener("keydown", handleKeydown);
		}
	});
</script>

<div class="flex flex-col">
	<!-- <div class="flex flex-row justify-center">Change Theme(BETA)</div>
	<div class="flex flex-row items-center gap-2">
		<Button onclick={() => setThemeWithStorage("redTheme")} variant="secondary">Red</Button>
		<Button onclick={() => setThemeWithStorage("purpleTheme")} variant="secondary">Purple</Button>
		<Button onclick={() => setThemeWithStorage("greenTheme")} variant="secondary">Green</Button>
		<Button onclick={() => setThemeWithStorage("")} variant="outline">Beige</Button>
		<Button onclick={toggleModeWithStorage} variant="outline" size="icon">
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div> -->

	<DropdownMenu.Root>
		<DropdownMenu.Trigger class="cursor-pointer">
			<Tooltip.Provider delayDuration={100}>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<!-- <Button variant='screen'><Palette/></Button> -->

						<p class="text-accent mx-2 text-sm">
							Change Theme
							<kbd
								class="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none"
							>
								<span class="text-xs">ALT</span>T
							</kbd>
						</p>
					</Tooltip.Trigger>
					<Tooltip.Content side="top">
						<span>Change Theme (Alt+T)</span>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="flex flex-row items-center gap-2 p-2">
			<DropdownMenu.Item closeOnSelect={false}>
				<Button onclick={() => setThemeWithStorage("")} variant="beigeButton">Beige</Button>
			</DropdownMenu.Item>
			<DropdownMenu.Item closeOnSelect={false}>
				<Button onclick={() => setThemeWithStorage("redTheme")} variant="redButton">Red</Button>
			</DropdownMenu.Item>
			<DropdownMenu.Item closeOnSelect={false}>
				<Button onclick={() => setThemeWithStorage("purpleTheme")} variant="purpleButton"
					>Purple</Button
				>
			</DropdownMenu.Item>
			<DropdownMenu.Item closeOnSelect={false}>
				<Button onclick={() => setThemeWithStorage("greenTheme")} variant="greenButton"
					>Green</Button
				>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

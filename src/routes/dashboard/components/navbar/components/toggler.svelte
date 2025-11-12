<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { toggleMode, setTheme } from "mode-watcher";
	import { Button } from "$lib/components/ui/button/index.js";
	import Palette from "@lucide/svelte/icons/palette";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	const THEME_STORAGE_KEY = "selectedTheme";
	const themes = ["", "redTheme", "purpleTheme", "forestTheme"];
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
		<DropdownMenu.Content class="flex min-w-[280px] flex-col gap-2 p-3">
			<DropdownMenu.Item closeOnSelect={false} class="cursor-pointer">
				<button
					onclick={() => setThemeWithStorage("")}
					class="hover:bg-accent/10 flex w-full items-center justify-between gap-3 rounded p-2 transition-colors"
				>
					<span class="font-medium">Tron Legacy</span>
					<div class="flex gap-1">
						<div
							class="bg-tronBackround border-border h-6 w-6 rounded-full border"
							title="Background"
						></div>
						<div
							class="bg-tronPrimary border-border h-6 w-6 rounded-full border"
							title="Primary"
						></div>
						<div
							class="bg-tronSecondary border-border h-6 w-6 rounded-full border"
							title="Secondary"
						></div>
						<div
							class="bg-tronAccent border-border h-6 w-6 rounded-full border"
							title="Accent"
						></div>
					</div>
				</button>
			</DropdownMenu.Item>
			<DropdownMenu.Item closeOnSelect={false} class="cursor-pointer">
				<button
					onclick={() => setThemeWithStorage("redTheme")}
					class="hover:bg-accent/10 flex w-full items-center justify-between gap-3 rounded p-2 transition-colors"
				>
					<span class="font-medium">Red</span>
					<div class="flex gap-1">
						<div
							class="bg-background border-border h-6 w-6 rounded-full border"
							title="Background"
						></div>
						<div class="bg-primary border-border h-6 w-6 rounded-full border" title="Primary"></div>
						<div
							class="bg-secondary border-border h-6 w-6 rounded-full border"
							title="Secondary"
						></div>
						<div class="bg-accent border-border h-6 w-6 rounded-full border" title="Accent"></div>
					</div>
				</button>
			</DropdownMenu.Item>
			<DropdownMenu.Item closeOnSelect={false} class="cursor-pointer">
				<button
					onclick={() => setThemeWithStorage("purpleTheme")}
					class="hover:bg-accent/10 flex w-full items-center justify-between gap-3 rounded p-2 transition-colors"
				>
					<span class="font-medium">Purple</span>
					<div class="flex gap-1">
						<div
							class="bg-background border-border h-6 w-6 rounded-full border"
							title="Background"
						></div>
						<div class="bg-primary border-border h-6 w-6 rounded-full border" title="Primary"></div>
						<div
							class="bg-secondary border-border h-6 w-6 rounded-full border"
							title="Secondary"
						></div>
						<div class="bg-accent border-border h-6 w-6 rounded-full border" title="Accent"></div>
					</div>
				</button>
			</DropdownMenu.Item>
			<DropdownMenu.Item closeOnSelect={false} class="cursor-pointer">
				<button
					onclick={() => setThemeWithStorage("forestTheme")}
					class="hover:bg-accent/10 flex w-full items-center justify-between gap-3 rounded p-2 transition-colors"
				>
					<span class="font-medium">Witching Woods</span>
					<div class="flex gap-1">
						<div
							class="bg-forestBackround border-border h-6 w-6 rounded-full border"
							title="Background"
						></div>
						<div class="bg-forestPrimary border-border h-6 w-6 rounded-full border" title="Primary"></div>
						<div
							class="bg-forestSecondary border-border h-6 w-6 rounded-full border"
							title="Secondary"
						></div>
						<div class="bg-forestAccent border-border h-6 w-6 rounded-full border" title="Accent"></div>
					</div>
				</button>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

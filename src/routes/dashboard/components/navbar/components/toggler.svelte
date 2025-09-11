<script lang="ts">
	import SunIcon from "@lucide/svelte/icons/sun";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import { onMount } from "svelte";

	import { toggleMode, setTheme, resetMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button/index.js";

	const THEME_STORAGE_KEY = "selectedTheme";
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
	}
	function toggleModeWithStorage() {
		toggleMode();
		if (typeof window !== "undefined") {
			const isDark = document.documentElement.classList.contains("dark");
			localStorage.setItem("dark-mode", isDark.toString());
		}
	}

	onMount(() => {
		const savedTheme = loadTheme();
		if (savedTheme) {
			setTheme(savedTheme);
		}

		if (typeof window !== "undefined") {
			const savedDarkMode = localStorage.getItem("dark-mode");
			if (savedDarkMode === "true" && !document.documentElement.classList.contains("dark")) {
				toggleMode();
			} else if (savedDarkMode === "false" && document.documentElement.classList.contains("dark")) {
				toggleMode();
			}
		}
	});
</script>

<div class="flex flex-col">
	<div class="flex flex-row justify-center">Change Theme(BETA)</div>
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
	</div>
</div>

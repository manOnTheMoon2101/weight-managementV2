<script lang="ts" module>
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
		variants: {
			variant: {
				default: "bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90",
				navbar: "bg-accent cursor-pointer text-foregroundAlt hover:bg-accent/90",
				destructive: "bg-destructive cursor-pointer text-foreground hover:bg-destructive/80",
				outline: "border-input cursor-pointer bg-background hover:bg-accent hover:text-accent-foreground border",
				secondary: "bg-secondary cursor-pointer text-white hover:bg-secondary/80",
				ghost: "hover:bg-accent cursor-pointer hover:text-accent-foreground",
				screen: "cursor-pointer hover:text-accent-foreground",
				sign:"bg-secondary cursor-pointer text-white hover:bg-secondary/80",
				logout:"bg-destructive cursor-pointer text-foreground hover:bg-destructive/80",
				link: "text-secondary underline-offset-4 cursor-pointer hover:underline",
				save: "text-accent underline-offset-4 cursor-pointer hover:underline",
				success : "bg-sign cursor-pointer text-white hover:bg-sign/80",

				tronButton: "bg-[#00FFF5] cursor-pointer text-white hover:bg-[#00FFF5)]/80",
				redButton: "bg-[hsl(0,100%,50%)] cursor-pointer text-white hover:bg-bg-[hsl(0,100%,50%)]/80",
				forestButton: "bg-[#31694E] cursor-pointer text-white hover:bg-[#31694E]/80",
				purpleButton: "bg-[hsl(330,37%,48%)] cursor-pointer text-white hover:bg-[hsl(330,37%,48%)]/80",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a bind:this={ref} class={cn(buttonVariants({ variant, size }), className)} {href} {...restProps}>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}

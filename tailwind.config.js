const animate = require("tailwindcss-animate")
/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
  files: ["./safelist.txt"],
  safelist: ["bg-primary-red", "stroke-white", "stroke-blue", "dark", "grid grid-cols-1", "md:grid-cols-2", "md:grid-cols-reverse"],
  prefix: "",
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
  ],
  presets: [],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
    },
    screens: {
      sm: "320px",
      md: "480px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "!md": { max: "479px" },
      "!lg": { max: "1023px" },
      "!xl": { max: "1279px" },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: {
        blue: "#012E5A",
        yellow: "#F0E175",
        red: "#A00000",
        gold: "#81740A",
        brand: "#B30000",
        // not sure how to name this, it seems unique
        claim: "#B40000",
        // Used to prevent js logic
        white: colors.white,
      },
      // for buttons, links, etc
      secondary: {
        red: "#A00000",
        yellow: "#DACA47",
        blue: "#002243",
      },
      // hovers, disabled, etc
      tertiary: {
        red: "#640000",
        yellow: "#9A8B14",
        blue: "#002243",
      },

      black: colors.black,

      gray: {
        50: "#DEE0E6",
        300: "#9AA3AB",
        600: "#6A7785",
        "600-translucent": "rgba(106, 119, 133, 0.6)",
        900: "#3E505E",
      } /* colors.coolGray, */,
      /* red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink, */
    },
    spacing: {
      px: "1px",
      0: "0px",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem",
      112: "28rem",
    },
    animation: {
      none: "none",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      bounce: "bounce 1s infinite",
    },
    backgroundColor: (theme) => theme("colors"),
    backgroundImage: {
      none: "none",
      "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
      "gradient-to-tr":
          "linear-gradient(to top right, var(--tw-gradient-stops))",
      "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
      "gradient-to-br":
          "linear-gradient(to bottom right, var(--tw-gradient-stops))",
      "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
      "gradient-to-bl":
          "linear-gradient(to bottom left, var(--tw-gradient-stops))",
      "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
      "gradient-to-tl":
          "linear-gradient(to top left, var(--tw-gradient-stops))",
    },
    backgroundOpacity: (theme) => theme("opacity"),
    backgroundPosition: {
      bottom: "bottom",
      center: "center",
      left: "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      right: "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      top: "top",
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.200", "currentColor"),
    }),
    borderOpacity: (theme) => theme("opacity"),
    borderRadius: {
      none: "0px",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0px",
      2: "2px",
      4: "4px",
      8: "8px",
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    cursor: {
      auto: "auto",
      default: "default",
      pointer: "pointer",
      wait: "wait",
      text: "text",
      move: "move",
      "not-allowed": "not-allowed",
    },
    divideColor: (theme) => theme("borderColor"),
    divideOpacity: (theme) => theme("borderOpacity"),
    divideWidth: (theme) => theme("borderWidth"),
    fill: { current: "currentColor" },
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      none: "none",
      "50%": "1 0 50%",
    },
    flexGrow: {
      0: "0",
      DEFAULT: "1",
    },
    flexShrink: {
      0: "0",
      DEFAULT: "1",
    },
    fontFamily: {
      sans: [
        "Source Sans Pro",
      ],

    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      "2lg": ["1.25rem", { lineHeight: "1.75rem" }],
      xl: ["1.5rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.75rem", { lineHeight: "2rem" }],
      "3xl": ["2rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.125rem", { lineHeight: "2.5rem" }],
      "5xl": ["2.5rem", { lineHeight: "1" }],
      "6xl": ["3.125rem", { lineHeight: "1" }],
    },
    fontWeight: {
      normal: "400",
      semibold: "600",
      bold: "700",
    },
    gap: (theme) => theme("spacing"),
    gradientColorStops: (theme) => theme("colors"),
    gridAutoColumns: {
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)",
    },
    gridAutoRows: {
      auto: "auto",
      min: "min-content",
      max: "max-content",
      fr: "minmax(0, 1fr)",
    },
    gridColumn: {
      auto: "auto",
      "span-1": "span 1 / span 1",
      "span-2": "span 2 / span 2",
      "span-3": "span 3 / span 3",
      "span-4": "span 4 / span 4",
      "span-5": "span 5 / span 5",
      "span-6": "span 6 / span 6",
      "span-7": "span 7 / span 7",
      "span-8": "span 8 / span 8",
      "span-9": "span 9 / span 9",
      "span-10": "span 10 / span 10",
      "span-11": "span 11 / span 11",
      "span-12": "span 12 / span 12",
      "span-full": "1 / -1",
    },
    gridColumnEnd: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
    },
    gridColumnStart: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
    },
    gridRow: {
      auto: "auto",
      "span-1": "span 1 / span 1",
      "span-2": "span 2 / span 2",
      "span-3": "span 3 / span 3",
      "span-4": "span 4 / span 4",
      "span-5": "span 5 / span 5",
      "span-6": "span 6 / span 6",
      "span-full": "1 / -1",
    },
    gridRowStart: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
    },
    gridRowEnd: {
      auto: "auto",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
    },
    transformOrigin: {
      center: "center",
      top: "top",
      "top-right": "top right",
      right: "right",
      "bottom-right": "bottom right",
      bottom: "bottom",
      "bottom-left": "bottom left",
      left: "left",
      "top-left": "top left",
    },
    gridTemplateColumns: {
      none: "none",
      1: "repeat(1, minmax(0, 1fr))",
      2: "repeat(2, minmax(0, 1fr))",
      3: "repeat(3, minmax(0, 1fr))",
      4: "repeat(4, minmax(0, 1fr))",
      5: "repeat(5, minmax(0, 1fr))",
      6: "repeat(6, minmax(0, 1fr))",
      7: "repeat(7, minmax(0, 1fr))",
      8: "repeat(8, minmax(0, 1fr))",
      9: "repeat(9, minmax(0, 1fr))",
      10: "repeat(10, minmax(0, 1fr))",
      11: "repeat(11, minmax(0, 1fr))",
      12: "repeat(12, minmax(0, 1fr))",
    },
    gridTemplateRows: {
      none: "none",
      1: "repeat(1, minmax(0, 1fr))",
      2: "repeat(2, minmax(0, 1fr))",
      3: "repeat(3, minmax(0, 1fr))",
      4: "repeat(4, minmax(0, 1fr))",
      5: "repeat(5, minmax(0, 1fr))",
      6: "repeat(6, minmax(0, 1fr))",
    },
    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      full: "100%",
      screen: "100vh",
    }),
    inset: (theme, { negative }) => ({
      auto: "auto",
      ...theme("spacing"),
      ...negative(theme("spacing")),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      full: "100%",
      "-1/2": "-50%",
      "-1/3": "-33.333333%",
      "-2/3": "-66.666667%",
      "-1/4": "-25%",
      "-2/4": "-50%",
      "-3/4": "-75%",
      "-1/5": "-20%",
      "-2/5": "-40%",
      "-3/5": "-60%",
      "-4/5": "-80%",
      "-full": "-100%",
    }),
    keyframes: {
      spin: {
        to: {
          transform: "rotate(360deg)",
        },
      },
      ping: {
        "75%, 100%": {
          transform: "scale(2)",
          opacity: "0",
        },
      },
      pulse: {
        "50%": {
          opacity: ".5",
        },
      },
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
        },
        "50%": {
          transform: "none",
          animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
        },
      },
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
      3: ".75",
      4: "1",
      5: "1.25",
      6: "1.5",
      7: "1.75",
      8: "2",
      9: "2.25",
      10: "2.5",
      11: "2.75",
      12: "3",
      13: "3.5",
      14: "4",
      15: "5",
      16: "6",
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
    },
    margin: (theme, { negative }) => ({
      auto: "auto",
      ...theme("spacing"),
      ...negative(theme("spacing")),
    }),
    maxHeight: (theme) => ({
      ...theme("spacing"),
      full: "100%",
      screen: "100vh",
    }),
    maxWidth: (theme, { breakpoints }) => ({
      none: "none",
      0: "0rem",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem",
      full: "100%",
      min: "min-content",
      max: "max-content",
      prose: "65ch",
      ...breakpoints(theme("screens")),
    }),
    minHeight: (theme) => ({
      0: "0px",
      ...theme("spacing"),
      full: "100%",
      screen: "100vh",
    }),
    minWidth: {
      0: "0px",
      full: "100%",
      min: "min-content",
      max: "max-content",
    },
    objectPosition: {
      bottom: "bottom",
      center: "center",
      left: "left",
      "left-bottom": "left bottom",
      "left-top": "left top",
      right: "right",
      "right-bottom": "right bottom",
      "right-top": "right top",
      top: "top",
    },
    opacity: {
      0: "0",
      5: "0.05",
      10: "0.1",
      20: "0.2",
      25: "0.25",
      30: "0.3",
      40: "0.4",
      50: "0.5",
      60: "0.6",
      70: "0.7",
      75: "0.75",
      80: "0.8",
      90: "0.9",
      95: "0.95",
      100: "1",
    },
    order: {
      first: "-9999",
      last: "9999",
      none: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
    },
    outline: {
      none: ["2px solid transparent", "2px"],
      white: ["2px dotted white", "2px"],
      black: ["2px dotted black", "2px"],
    },
    padding: (theme) => theme("spacing"),
    placeholderColor: (theme) => theme("colors"),
    placeholderOpacity: (theme) => theme("opacity"),
    ringColor: (theme) => ({
      DEFAULT: theme("colors.blue.500", "#3b82f6"),
      ...theme("colors"),
    }),
    ringOffsetColor: (theme) => theme("colors"),
    ringOffsetWidth: {
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
    },
    ringOpacity: (theme) => ({
      DEFAULT: "0.5",
      ...theme("opacity"),
    }),
    ringWidth: {
      DEFAULT: "3px",
      0: "0px",
      1: "1px",
      2: "2px",
      4: "4px",
      8: "8px",
    },
    rotate: {
      "-180": "-180deg",
      "-90": "-90deg",
      "-45": "-45deg",
      "-12": "-12deg",
      "-6": "-6deg",
      "-3": "-3deg",
      "-2": "-2deg",
      "-1": "-1deg",
      0: "0deg",
      1: "1deg",
      2: "2deg",
      3: "3deg",
      6: "6deg",
      12: "12deg",
      45: "45deg",
      90: "90deg",
      180: "180deg",
    },
    scale: {
      0: "0",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      100: "1",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5",
    },
    skew: {
      "-12": "-12deg",
      "-6": "-6deg",
      "-3": "-3deg",
      "-2": "-2deg",
      "-1": "-1deg",
      0: "0deg",
      1: "1deg",
      2: "2deg",
      3: "3deg",
      6: "6deg",
      12: "12deg",
    },
    space: (theme, { negative }) => ({
      ...theme("spacing"),
      ...negative(theme("spacing")),
    }),
    stroke: {
      current: "currentColor",
    },
    strokeWidth: {
      0: "0",
      1: "1",
      2: "2",
    },
    textColor: (theme) => ({
      ...theme("colors"),
      inherit: "inherit",
    }),
    textOpacity: (theme) => theme("opacity"),
    transitionDuration: {
      DEFAULT: "150ms",
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms",
    },
    transitionDelay: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms",
    },
    transitionProperty: {
      none: "none",
      all: "all",
      DEFAULT:
          "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
      colors: "background-color, border-color, color, fill, stroke",
      opacity: "opacity",
      shadow: "box-shadow",
      transform: "transform",
    },
    transitionTimingFunction: {
      DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    translate: (theme, { negative }) => ({
      ...theme("spacing"),
      ...negative(theme("spacing")),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      full: "100%",
      "-1/2": "-50%",
      "-1/3": "-33.333333%",
      "-2/3": "-66.666667%",
      "-1/4": "-25%",
      "-2/4": "-50%",
      "-3/4": "-75%",
      "-full": "-100%",
    }),
    width: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%",
      screen: "100vw",
      min: "min-content",
      max: "max-content",
    }),
    zIndex: {
      auto: "auto",
      0: "0",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
    },
  },
  variantOrder: [
    "first",
    "last",
    "odd",
    "even",
    "visited",
    "checked",
    "group-hover",
    "group-focus",
    "focus-within",
    "hover",
    "focus",
    "focus-visible",
    "active",
    "disabled",
  ],
  plugins: [
    animate,
    require("tailwindcss-fluid")({
      textSizes: {
        sm: {
          min: "0.938rem",
          max: "0.938rem",
          minvw: "1024",
          maxvw: "1920px",
        },
        md: {
          min: "1.125rem",
          max: "1.125rem",
          minvw: "1024",
          maxvw: "1920px",
        },
        lg: {
          min: "1.5rem",
          max: "1.5rem",
          minvw: "1024",
          maxvw: "1920px",
        },
        xl: {
          min: "1.5rem",
          max: "1.75rem",
          minvw: "1024",
          maxvw: "1920px",
        },
        "2xl": {
          min: "1.75rem",
          max: "2.125rem",
          minvw: "1024",
          maxvw: "1920px",
        },
        "3xl": {
          min: "2.125rem",
          max: "2.5rem",
          minvw: "1024",
          maxvw: "1920px",
        },
        navigation: {
          min: "1.5rem",
          max: "2.5rem",
          minvw: "320px",
          maxvw: "1624px",
        },
        claim: {
          min: "1.063rem",
          max: "1.313rem",
          minvw: "320px",
          maxvw: "1024px",
        },
        "footer-claim": {
          min: "0.8rem",
          max: "1rem",
          minvw: "1024px",
          maxvw: "1438px",
        },
      },
    }),
  ],

};
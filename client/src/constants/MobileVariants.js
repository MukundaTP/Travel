// Animation variants
export const navbarVariants = {
  initial: { y: -100 },
  animate: {
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

export const linkVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const mobileMenuVariants = {
  closed: {
    x: "100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
};

export const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact" },
];

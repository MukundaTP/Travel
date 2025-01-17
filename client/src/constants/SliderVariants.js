export const slideVariants = {
  enter: (direction) => ({
    x: direction === "right" ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction === "right" ? -1000 : 1000,
    opacity: 0,
  }),
};

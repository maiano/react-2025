export const UI_STRINGS = {
  searchPlaceholder: 'Pickle? Prove it!',
  searchButton: 'Scan the Multiverse',
  title: 'Rick and Morty',
  errorButton: 'Break the Universe',
  refreshButton: 'Refresh the Universe',
  altLoading: 'Loading...',
  altLogo: 'Logo: Rick and Morty',
  home: 'Home',
  about: 'About',
  contentAboutPage:
    'Meeseeks here! The About page? Yeah... Evil Morty hid it somewhere between dimensions. Still working on it, okay?!',
  flyout: {
    itemsSelected: (count: number) =>
      `${count} ${count === 1 ? 'item is' : 'items are'} selected`,
    unselectAll: 'Unselect all',
    download: 'Download',
  },
} as const;

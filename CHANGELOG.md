# 2.0.0

`vue-sticky` use native `position: sticky;` when avaliabled now.

Use `VueSticky` as library name instead of `StickyDirective`.

Breaking changes:
- For performance reasons, we don't fire events when changing sticky state, since events are slow and not very useful here. And native css sticky doesn't fire events at all.
- For simplicity, we require a wrapper element for sticky element. VueSticky will set its height dynamically.

# 3.1.0
- Update style when data has been updated.

# 3.0.0
- Support vue.js(2.x)

# 2.1.0
- remove `holder-height` param, its unnecessary because we will get height of directive element dynamic.
- always get directive position once rolling still the directive be destroy.

# 2.0.0

`vue-sticky` use native `position: sticky;` when avaliabled now.

Use `VueSticky` as library name instead of `StickyDirective`.

Breaking changes:
- For performance reasons, we don't fire events when changing sticky state, since events are slow and not very useful here. And native css sticky doesn't fire events at all.
- For simplicity, we require a wrapper element for sticky element. VueSticky will set its height dynamically.

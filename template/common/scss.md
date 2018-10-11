## SASS가이드

### 기본구조

```css
/common //공통
    /_reset.scss
    /_mixin.scss
    /_form.scss
    /_btn.scss
    /_board.scss
    /_component.scss
    /_popUp.scss
    /_layer.scss	
    
/_variables.scss
/_layout.scss
/_lecture.scss
/common.scss
/main.scss
/sub.scss
```



#### common.scss

```css
@charset "UTF-8";
@import 'variables',
    'common/mixin',
    'common/webfont',
    'common/reset',
    'layout';

/* color */
.point-color{color:$ptc !important;}
```



#### sub.scss

```css
@charset "UTF-8";
@import 'variables',
    'common/mixin',
    'common/form',
    'common/btn',
    'common/ico',
    'common/board',
    'common/component',
    'common/popUp',
    'lecture';   // page
```



#### main.scss

```css
@charset "UTF-8";

@import 'variables',
    'common/mixin';
```


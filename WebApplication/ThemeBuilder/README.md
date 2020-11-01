# README

## Theme Builder

The .css and .js files related to the Theme Builder are located in \Source\BizAgiBPM\BizAgiBPM\ThemeBuilder.

It is important to know that the styles of all the themes except for Bizagi Go, are managed in the folder located in Source\BizAgiBPM\BizAgiBPM\ThemeBuilder\libs\css (rules.theme.less, mixins.less). The Bizagi Go styles are defined in Source\BizAgiBPM\BizAgiBPM\ThemeBuilder\libs\js\json (in this folder are the files related to this theme).

### Note: If you want to do a change in the themes, most times, it is necessary to apply the change in the .txt file in orfer to make the changes for Bizagi Go.

In the file ThemeBuilder\libs\js\json\theme.predefined.json.txt are set the colors and the image of the default themes, like Lost Woods, Beezagi, Bizagi GO. This file overwrite the others styles of the themes because is the last one to load.
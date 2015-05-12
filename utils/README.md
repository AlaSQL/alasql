# AlaSQL development utilities

This is a space for some utulities to be used in AlaSQL development

## 2ch

Some names in the source code have to much charaters, like '.toJavaScript()'. 
This utility helps to identify the most frequent names and replace some of them
with short 2 characters analogues, like: 
* .toJavaScript() -> .JS()
* CreateView -> CV
* CreateVertex -> CX

All pairs will be selected manually to prevent errors (e.g. replace JavaScript keywords)

Accoring preliminary calculations, this will help to save up to 50-70kb (20% size of the library).

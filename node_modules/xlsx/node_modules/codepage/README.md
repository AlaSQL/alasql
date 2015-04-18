# Codepages for JS

[Codepages](https://en.wikipedia.org/wiki/Codepage) are character encodings.  In
many contexts, single- or double-byte character sets are used in lieu of Unicode
encodings.  The codepages map between characters and numbers.

[unicode.org](http://www.unicode.org/Public/MAPPINGS/) hosts lists of mappings.
The build script automatically downloads and parses the mappings in order to
generate the full script.  The `pages.csv` description in `codepage.md` controls
which codepages are used.

## Setup

In node:

    var cptable = require('codepage');

In the browser:

    <script src="cptable.js"></script>
    <script src="cputils.js"></script>

Alternatively, use the full version in the dist folder:

    <script src="cptable.full.js"></script>

The complete set of codepages is large due to some Double Byte Character Set
encodings.  A much smaller file that just includes SBCS codepages is provided in
this repo (`sbcs.js`), as well as a file for other projects (`cpexcel.js`)

If you know which codepages you need, you can include individual scripts for
each codepage.  The individual files are provided in the `bits/` directory.
For example, to include only the Mac codepages:

    <script src="bits/10000.js"></script>
    <script src="bits/10006.js"></script>
    <script src="bits/10007.js"></script>
    <script src="bits/10029.js"></script>
    <script src="bits/10079.js"></script>
    <script src="bits/10081.js"></script>

All of the browser scripts define and append to the `cptable` object.  To rename
the object, edit the `JSVAR` shell variable in `make.sh` and run the script.

The utilities functions are contained in `cputils.js`, which assumes that the
appropriate codepage scripts were loaded.

## Usage

The codepages are indexed by number.  To get the unicode character for a given
codepoint, use the `dec` property:

    var unicode_cp10000_255 = cptable[10000].dec[255]; // ˇ

To get the codepoint for a given character, use the `enc` property:

    var cp10000_711 = cptable[10000].enc[String.fromCharCode(711)]; // 255

There are a few utilities that deal with strings and buffers:

    var 汇总 = cptable.utils.decode(936, [0xbb,0xe3,0xd7,0xdc]);
    var buf =  cptable.utils.encode(936,  汇总);
    var sushi= cptable.utils.decode(65001, [0xf0,0x9f,0x8d,0xa3]); // 🍣
    var sbuf = cptable.utils.encode(65001, sushi);

`cptable.utils.encode(CP, data, ofmt)` accepts a String or Array of characters
and returns a representation controlled by `ofmt`:

- Default output is a Buffer (or Array) of bytes (integers between 0 and 255).
- If `ofmt == 'str'`, return a String where `o.charCodeAt(i)` is the ith byte
- If `ofmt == 'arr'`, return an Array of bytes

## Known Excel Codepages

A much smaller script, including only the codepages known to be used in Excel,
is available under the name `cpexcel`.  It exposes the same variable `cptable`
and is suitable as a drop-in replacement when the full codepage tables are not
needed.

In node:

    var cptable = require('codepage/dist/cpexcel.full');

## Rolling your own script

The `make.sh` script in the repo can take a manifest and generate JS source.

Usage:

    bash make.sh path_to_manifest output_file_name JSVAR

where

- `JSVAR` is the name of the exported variable (generally `cptable`)
- `output_file_name` is the output file (e.g. `cpexcel.js`, `cptable.js`)
- `path_to_manifest` is the path to the manifest file.

The manifest file is expected to be a CSV with 3 columns:

    <codepage number>,<source>,<size>

If a source is specified, it will try to download the specified file and parse.
The file format is expected to follow the format from the unicode.org site.
The size should be `1` for a single-byte codepage and `2` for a double-byte
codepage.  For mixed codepages (which use some single- and some double-byte
codes), the script assumes the mapping is a prefix code and generates efficient
JS code.

Generated scripts only include the mapping.  `cat` a mapping with `cputils.js`
to produce a complete script like `cpexcel.full.js`.

## Building the complete script

This script uses [voc](npm.im/voc).  The script to build the codepage tables and
the JS source is `codepage.md`, so building is as simple as `voc codepage.md`.

## Generated Codepages

The complete list of hardcoded codepages can be found in the file `pages.csv`.

Some codepages are easier to implement algorithmically.  Since these are
hardcoded in utils, there is no corresponding entry (they are "magic")

| CP# |  Information  | Description |
| --: |  :----------: | :---------- |
|   37|  unicode.org  |IBM EBCDIC US-Canada
|  437|  unicode.org  |OEM United States
|  500|  unicode.org  |IBM EBCDIC International
|  620|      NLS      |Mazovia (Polish) MS-DOS
|  708|MakeEncoding.cs|Arabic (ASMO 708)
|  720|MakeEncoding.cs|Arabic (Transparent ASMO); Arabic (DOS)
|  737|  unicode.org  |OEM Greek (formerly 437G); Greek (DOS)
|  775|  unicode.org  |OEM Baltic; Baltic (DOS)
|  850|  unicode.org  |OEM Multilingual Latin 1; Western European (DOS)
|  852|  unicode.org  |OEM Latin 2; Central European (DOS)
|  855|  unicode.org  |OEM Cyrillic (primarily Russian)
|  857|  unicode.org  |OEM Turkish; Turkish (DOS)
|  858|MakeEncoding.cs|OEM Multilingual Latin 1 + Euro symbol
|  860|  unicode.org  |OEM Portuguese; Portuguese (DOS)
|  861|  unicode.org  |OEM Icelandic; Icelandic (DOS)
|  862|  unicode.org  |OEM Hebrew; Hebrew (DOS)
|  863|  unicode.org  |OEM French Canadian; French Canadian (DOS)
|  864|  unicode.org  |OEM Arabic; Arabic (864)
|  865|  unicode.org  |OEM Nordic; Nordic (DOS)
|  866|  unicode.org  |OEM Russian; Cyrillic (DOS)
|  869|  unicode.org  |OEM Modern Greek; Greek, Modern (DOS)
|  870|MakeEncoding.cs|IBM EBCDIC Multilingual/ROECE (Latin 2)
|  874|  unicode.org  |Windows Thai
|  875|  unicode.org  |IBM EBCDIC Greek Modern
|  895|      NLS      |Kamenický (Czech) MS-DOS
|  932|  unicode.org  |Japanese Shift-JIS
|  936|  unicode.org  |Simplified Chinese GBK
|  949|  unicode.org  |Korean
|  950|  unicode.org  |Traditional Chinese Big5
| 1026|  unicode.org  |IBM EBCDIC Turkish (Latin 5)
| 1047|MakeEncoding.cs|IBM EBCDIC Latin 1/Open System
| 1140|MakeEncoding.cs|IBM EBCDIC US-Canada (037 + Euro symbol)
| 1141|MakeEncoding.cs|IBM EBCDIC Germany (20273 + Euro symbol)
| 1142|MakeEncoding.cs|IBM EBCDIC Denmark-Norway (20277 + Euro symbol)
| 1143|MakeEncoding.cs|IBM EBCDIC Finland-Sweden (20278 + Euro symbol)
| 1144|MakeEncoding.cs|IBM EBCDIC Italy (20280 + Euro symbol)
| 1145|MakeEncoding.cs|IBM EBCDIC Latin America-Spain (20284 + Euro symbol)
| 1146|MakeEncoding.cs|IBM EBCDIC United Kingdom (20285 + Euro symbol)
| 1147|MakeEncoding.cs|IBM EBCDIC France (20297 + Euro symbol)
| 1148|MakeEncoding.cs|IBM EBCDIC International (500 + Euro symbol)
| 1149|MakeEncoding.cs|IBM EBCDIC Icelandic (20871 + Euro symbol)
| 1200|     magic     |Unicode UTF-16, little endian (BMP of ISO 10646)
| 1201|     magic     |Unicode UTF-16, big endian
| 1250|  unicode.org  |Windows Central Europe
| 1251|  unicode.org  |Windows Cyrillic
| 1252|  unicode.org  |Windows Latin I
| 1253|  unicode.org  |Windows Greek
| 1254|  unicode.org  |Windows Turkish
| 1255|  unicode.org  |Windows Hebrew
| 1256|  unicode.org  |Windows Arabic
| 1257|  unicode.org  |Windows Baltic
| 1258|  unicode.org  |Windows Vietnam
| 1361|MakeEncoding.cs|Korean (Johab)
|10000|  unicode.org  |MAC Roman
|10001|MakeEncoding.cs|Japanese (Mac)
|10002|MakeEncoding.cs|MAC Traditional Chinese (Big5)
|10003|MakeEncoding.cs|Korean (Mac)
|10004|MakeEncoding.cs|Arabic (Mac)
|10005|MakeEncoding.cs|Hebrew (Mac)
|10006|  unicode.org  |Greek (Mac)
|10007|  unicode.org  |Cyrillic (Mac)
|10008|MakeEncoding.cs|MAC Simplified Chinese (GB 2312)
|10010|MakeEncoding.cs|Romanian (Mac)
|10017|MakeEncoding.cs|Ukrainian (Mac)
|10021|MakeEncoding.cs|Thai (Mac)
|10029|  unicode.org  |MAC Latin 2 (Central European)
|10079|  unicode.org  |Icelandic (Mac)
|10081|  unicode.org  |Turkish (Mac)
|10082|MakeEncoding.cs|Croatian (Mac)
|12000|     magic     |Unicode UTF-32, little endian byte order
|12001|     magic     |Unicode UTF-32, big endian byte order
|20000|MakeEncoding.cs|CNS Taiwan (Chinese Traditional)
|20001|MakeEncoding.cs|TCA Taiwan
|20002|MakeEncoding.cs|Eten Taiwan (Chinese Traditional)
|20003|MakeEncoding.cs|IBM5550 Taiwan
|20004|MakeEncoding.cs|TeleText Taiwan
|20005|MakeEncoding.cs|Wang Taiwan
|20105|MakeEncoding.cs|Western European IA5 (IRV International Alphabet 5) 7-bit
|20106|MakeEncoding.cs|IA5 German (7-bit)
|20107|MakeEncoding.cs|IA5 Swedish (7-bit)
|20108|MakeEncoding.cs|IA5 Norwegian (7-bit)
|20127|     magic     |US-ASCII (7-bit)
|20261|MakeEncoding.cs|T.61
|20269|MakeEncoding.cs|ISO 6937 Non-Spacing Accent
|20273|MakeEncoding.cs|IBM EBCDIC Germany
|20277|MakeEncoding.cs|IBM EBCDIC Denmark-Norway
|20278|MakeEncoding.cs|IBM EBCDIC Finland-Sweden
|20280|MakeEncoding.cs|IBM EBCDIC Italy
|20284|MakeEncoding.cs|IBM EBCDIC Latin America-Spain
|20285|MakeEncoding.cs|IBM EBCDIC United Kingdom
|20290|MakeEncoding.cs|IBM EBCDIC Japanese Katakana Extended
|20297|MakeEncoding.cs|IBM EBCDIC France
|20420|MakeEncoding.cs|IBM EBCDIC Arabic
|20423|MakeEncoding.cs|IBM EBCDIC Greek
|20424|MakeEncoding.cs|IBM EBCDIC Hebrew
|20833|MakeEncoding.cs|IBM EBCDIC Korean Extended
|20838|MakeEncoding.cs|IBM EBCDIC Thai
|20866|MakeEncoding.cs|Russian Cyrillic (KOI8-R)
|20871|MakeEncoding.cs|IBM EBCDIC Icelandic
|20880|MakeEncoding.cs|IBM EBCDIC Cyrillic Russian
|20905|MakeEncoding.cs|IBM EBCDIC Turkish
|20924|MakeEncoding.cs|IBM EBCDIC Latin 1/Open System (1047 + Euro symbol)
|20932|MakeEncoding.cs|Japanese (JIS 0208-1990 and 0212-1990)
|20936|MakeEncoding.cs|Simplified Chinese (GB2312-80)
|20949|MakeEncoding.cs|Korean Wansung
|21025|MakeEncoding.cs|IBM EBCDIC Cyrillic Serbian-Bulgarian
|21027|      NLS      |Extended/Ext Alpha Lowercase
|21866|MakeEncoding.cs|Ukrainian Cyrillic (KOI8-U)
|28591|  unicode.org  |ISO 8859-1 Latin 1 (Western European)
|28592|  unicode.org  |ISO 8859-2 Latin 2 (Central European)
|28593|  unicode.org  |ISO 8859-3 Latin 3
|28594|  unicode.org  |ISO 8859-4 Baltic
|28595|  unicode.org  |ISO 8859-5 Cyrillic
|28596|  unicode.org  |ISO 8859-6 Arabic
|28597|  unicode.org  |ISO 8859-7 Greek
|28598|  unicode.org  |ISO 8859-8 Hebrew (ISO-Visual)
|28599|  unicode.org  |ISO 8859-9 Turkish
|28600|  unicode.org  |ISO 8859-10 Latin 6
|28601|  unicode.org  |ISO 8859-11 Latin (Thai)
|28603|  unicode.org  |ISO 8859-13 Latin 7 (Estonian)
|28604|  unicode.org  |ISO 8859-14 Latin 8 (Celtic)
|28605|  unicode.org  |ISO 8859-15 Latin 9
|28606|  unicode.org  |ISO 8859-15 Latin 10
|29001|MakeEncoding.cs|Europa 3
|38598|MakeEncoding.cs|ISO 8859-8 Hebrew (ISO-Logical)
|50220|MakeEncoding.cs|ISO 2022 JIS Japanese with no halfwidth Katakana
|50221|MakeEncoding.cs|ISO 2022 JIS Japanese with halfwidth Katakana
|50222|MakeEncoding.cs|ISO 2022 Japanese JIS X 0201-1989 (1 byte Kana-SO/SI)
|50225|MakeEncoding.cs|ISO 2022 Korean
|50227|MakeEncoding.cs|ISO 2022 Simplified Chinese
|51932|MakeEncoding.cs|EUC Japanese
|51936|MakeEncoding.cs|EUC Simplified Chinese
|51949|MakeEncoding.cs|EUC Korean
|52936|MakeEncoding.cs|HZ-GB2312 Simplified Chinese
|54936|MakeEncoding.cs|GB18030 Simplified Chinese (4 byte)
|57002|MakeEncoding.cs|ISCII Devanagari
|57003|MakeEncoding.cs|ISCII Bengali
|57004|MakeEncoding.cs|ISCII Tamil
|57005|MakeEncoding.cs|ISCII Telugu
|57006|MakeEncoding.cs|ISCII Assamese
|57007|MakeEncoding.cs|ISCII Oriya
|57008|MakeEncoding.cs|ISCII Kannada
|57009|MakeEncoding.cs|ISCII Malayalam
|57010|MakeEncoding.cs|ISCII Gujarati
|57011|MakeEncoding.cs|ISCII Punjabi
|65000|     magic     |Unicode (UTF-7)
|65001|     magic     |Unicode (UTF-8)

Note that MakeEncoding.cs deviates from unicode.org for some codepages.  In the
case of direct conflicts, unicode.org takes precedence.  In cases where the
unicode.org listing does not prescribe a value, MakeEncoding.cs value is used.

NLS refers to the National Language Support files supplied in various versions of
Windows.  In older versions of Windows (e.g. Windows 98) these files followed the
pattern `CP_#.NLS`, but newer versions use the pattern `C_#.NLS`.

## Sources

- [Unicode Consortium Public Mappings](http://www.unicode.org/Public/MAPPINGS/)
- [Code Page Enumeration](http://msdn.microsoft.com/en-us/library/cc195051.aspx)
- [Code Page Identifiers](http://msdn.microsoft.com/en-us/library/windows/desktop/dd317756.aspx)

## Badges

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/afa29a5e8495a01059ee5b353f9042cb "githalytics.com")](http://githalytics.com/SheetJS/js-codepage)
[![Build Status](https://travis-ci.org/SheetJS/js-codepage.svg?branch=master)](https://travis-ci.org/SheetJS/js-codepage)
[![Coverage Status](https://coveralls.io/repos/SheetJS/js-codepage/badge.png)](https://coveralls.io/r/SheetJS/js-codepage)

'use strict'

/**
 * 此文件中将需要的CodeMirror文件全部引入
 */

import CodeMirror from 'codemirror/lib/codemirror'

// key map
import 'codemirror/keymap/vim'
import 'codemirror/keymap/emacs'
import 'codemirror/keymap/sublime'

// Code highlight
import CodeMirrorHLClike from 'codemirror/mode/clike/clike'
import CodeMirrorHLGO from 'codemirror/mode/go/go'

// addons
import CodeMirrorDialog from 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/dialog/dialog.css'

// themes
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/night.css'
import 'codemirror/theme/solarized.css'

export default CodeMirror
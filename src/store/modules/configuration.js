const configuration = {
  state: {
    githubUsername: '',
    blogTitle: '',
    blogDescribe: '',
    htmlTitle: '',
    fontColor: '',
    useBackgroundImage: false,
    backgroundColorLeft: '',
    backgroundColorRight: '',
    mini: false,
    webSites: []
  },

  mutations: {
    SET_CONFIGURATION: (state, configuration) => {
      state.githubUsername = configuration.githubUsername || 'GitHub-Laziji'

      state.blogTitle = configuration.blogTitle || state.githubUsername

      state.blogDescribe = configuration.blogDescribe || `欢迎来到${state.githubUsername}的个人博客。`

      state.htmlTitle = configuration.htmlTitle || `${state.githubUsername}的博客`

      state.fontColor = configuration.fontColor || '#ffffff'

      state.useBackgroundImage = configuration.useBackgroundImage || false

      state.backgroundColorLeft = configuration.backgroundColorLeft || '#155799'

      state.backgroundColorRight = configuration.backgroundColorRight || '#159957'

      state.mini = configuration.mini || false

      state.webSites = configuration.webSites || []
    }
  },

  actions: {
    LocalReload ({ commit }, configuration) {
      commit('SET_CONFIGURATION', configuration)
    },
    Init ({ commit }) {
      let xmlhttp
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
      } else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
      }

      // Determine the base path for configuration.json based on current location
      // In production: files are served from /myblog/ subdirectory (no /static/ subfolder)
      // In development: files are in /static/ relative to webpack-dev-server
      const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

      const configPaths = isLocalDev
        ? [
            '../../../static/configuration.json',  // Local webpack-dev-server path
            './static/configuration.json'
          ]
        : [
            '/myblog/configuration.json',          // GitHub Pages deployment (absolute path)
            './myblog/configuration.json'          // Relative fallback
          ]

      let configuration = null
      for (const path of configPaths) {
        try {
          xmlhttp.open('GET', path, false)
          xmlhttp.send()
          if (xmlhttp.status === 200) {
            configuration = JSON.parse(xmlhttp.responseText)
            console.log(`Configuration loaded successfully from: ${path}`)
            break
          }
        } catch (error) {
          console.warn(`Failed to load configuration from ${path}:`, error)
          continue
        }
      }

      if (!configuration) {
        console.error('Failed to load configuration from any path')
        // Use default configuration as fallback
        configuration = {
          githubUsername: 'phoenixzqy',
          blogTitle: 'My Blog',
          blogDescribe: 'Welcome to my blog',
          htmlTitle: 'My Blog',
          fontColor: '#ffffff',
          useBackgroundImage: false,
          backgroundColorLeft: '#155799',
          backgroundColorRight: '#159957',
          mini: false,
          webSites: []
        }
      }

      commit('SET_CONFIGURATION', configuration)
    }
  }
}

export default configuration

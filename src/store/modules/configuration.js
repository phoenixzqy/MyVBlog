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

      // Dynamically determine the base path for configuration.json
      const getBasePath = () => {
        const currentPath = window.location.pathname
        if (currentPath.includes('/myblog/')) {
          // Production deployment under myblog subdirectory
          return './myblog/static/configuration.json'
        } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          // Local development
          return '../../../static/configuration.json'
        } else {
          // GitHub Pages root deployment or other environments
          return './static/configuration.json'
        }
      }

      const configPaths = [
        getBasePath(),
        './myblog/static/configuration.json',    // GitHub Pages deployment with myblog prefix
        '../../../static/configuration.json',    // Local development
        './static/configuration.json',           // GitHub Pages root deployment
        '/static/configuration.json'             // Alternative fallback
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

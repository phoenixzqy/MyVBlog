import request from '@/utils/request'
import store from '../store/index'

export default {
  getBlogReadme:function(){
    let githubUsername=store.state.configuration.githubUsername
    return request({
      url: '/repos/'+githubUsername+'/'+githubUsername+'.github.io/contents/README.md'
    })
  },
  list:function(query){
    let githubUsername=store.state.configuration.githubUsername
    return request({
      url: `/users/${githubUsername}/repos?page=${query.page}&per_page=${query.pageSize}`
      
    })
  },
  single:function(name){
    let githubUsername=store.state.configuration.githubUsername
    return new Promise((resolve, reject)=>{
      request({
        url: '/repos/'+githubUsername+'/'+name
      }).then((response)=>{
        request({
          url: '/repos/'+githubUsername+'/'+name+'/contents/README.md'
        }).then((sr)=>{
          response.data['readme_content']=sr.data['content']
          resolve(response)
        }).catch(()=>{
          response.data['readme_content']=""
          resolve(response)
        })
      })
      
    })
  },

}
import React , {useState}from 'react';
import Footer from './HomeComponents/Footer';
import LeftBar from './HomeComponents/LeftBar';
import TopBar from './HomeComponents/TopBar';
import Post from './HomeComponents/Post';
import useUpload from './HomeComponents/Posts/upload';

function Home({username}) {
    const { uploadedImage, uploadedVideo, handlePhotoUpload, handleVideoUpload,clearUploads } = useUpload();

      // 新增的分组状态
      const [selectedGroup, setSelectedGroup] = useState("Look Around");

      // 更新选定分组
      const handleGroupChange = (group) => {
          setSelectedGroup(group);
      }
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} >
          {/* 确保 TopBar 始终在页面顶部 */}
          <div style={{ flexShrink: 0 }}>

        <TopBar 
          onPhotoUpload={handlePhotoUpload} 
          onVideoUpload={handleVideoUpload} 
          username={username}
        />
         </div>
        <div style={{  display: 'flex', flex: 1, padding: '10px'  }}>
          <LeftBar onGroupChange={handleGroupChange} username = {username} />
          <div style={{ flex: 1}}>
            <Post 
            uploadedImage={uploadedImage} 
            uploadedVideo={uploadedVideo} 
            clearUploads={clearUploads} 
            selectedGroup={selectedGroup}
            username={username}
            />
          </div>
        </div>
        <Footer style={{ marginTop: 'auto' }} />
      </div>
    );
  }
  

export default Home;
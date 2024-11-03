import React , {useState}from 'react';
import Footer from './Components/Footer';
import LeftBar from './Components/LeftBar';
import TopBar from './Components/TopBar';
import Post from './Components/Post';
import useUpload from './Components/Posts/upload';

function Home() {
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
        />
         </div>
        <div style={{  display: 'flex', flex: 1, padding: '10px'  }}>
          <LeftBar onGroupChange={handleGroupChange} />
          <div style={{ flex: 1}}>
            <Post 
            uploadedImage={uploadedImage} 
            uploadedVideo={uploadedVideo} 
            clearUploads={clearUploads} // 传递 clearUploads 方法
            selectedGroup={selectedGroup}
            />
          </div>
        </div>
        <Footer style={{ marginTop: 'auto' }} />
      </div>
    );
  }
  

export default Home;
import {Composition} from 'remotion';
import {MyVideo} from './src/Video';

export const RemotionVideo: React.FC = () => {
  return (
    <Composition
      id="SpiritualManifestation"
      component={MyVideo}
      durationInFrames={1800}  // 60s @ 30fps
      fps={30}
      defaultProps={{
        text: 'Your dynamic prop from backend JSON',
        scenes: []  // Passed from backend
      }}
      width={1080}
      height={1920}
    />
  );
};

// src/Video.js (create this subfile)
export const MyVideo = ({scenes, text}) => {
  // Render scenes with <AbsoluteFill>, text animations, etc.
  // Use Remotion's <Img>, <Video> for b-roll (add free stock assets)
  return (
    <AbsoluteFill style={{backgroundColor: 'linear-gradient(to bottom, #667eea 0%, #764ba2 100%)'}}>
      <h1>{text}</h1>  // Expand with scene loops
    </AbsoluteFill>
  );
};

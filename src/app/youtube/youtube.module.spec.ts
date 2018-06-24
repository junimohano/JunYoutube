import { YoutubeModule } from './youtube.module';

describe('YoutubeModule', () => {
  let youtubeModule: YoutubeModule;

  beforeEach(() => {
    youtubeModule = new YoutubeModule();
  });

  it('should create an instance', () => {
    expect(youtubeModule).toBeTruthy();
  });
});

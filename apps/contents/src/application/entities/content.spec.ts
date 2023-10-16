import Content from './content.entity';

describe('Content Entity', () => {
  it('should be able to create a content', () => {
    const content = new Content({
      title: 'Banana test',
      content: 'test,test,testing...',
    });
    expect(content).toBeTruthy();
  });
});

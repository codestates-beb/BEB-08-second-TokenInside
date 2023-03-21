  const { Post } = require("../models");


  // 게시물 세부 정보 보기
  exports.detail_get = async (req, res, next) => {
    try {
      //1. URL params에서 post_id 가져오기
      console.log(req.params)
      const post_id = req.params.post_id;
      console.log(post_id)
      //2. DB에서 해당 포스트 불러오기
      const post = await Post.findOne({
        where : {
          id : post_id
        }
      });
      if (!post) {
        return res.status(404).json({
          message: '게시물을 찾을 수 없음'
        });
      }
      //3. 프론트로 post 데이터 보내주기
      res.status(200).json({
        message: '게시물을 성공적으로 가져왔습니다.',
        post: post
      });

    } catch (error) {
      res.status(500).json({
        message: '게시물 가져오기에 실패했습니다!'
      });
    }
  };

  // 새 글 등록하기
  exports.register_post = async (req, res, next) => {
    try { //1. 프론트에서 title , content 받아오기

      const title = req.body.title;
      const content = req.body.content;

      //2. 세션을 이용해서 글쓴이 , 유저 알아내기
      const user = JSON.parse(req.session.user);
      //3. DB에 저장하기
      const result = await Post.create({
        user_id : user.id,
        title : title,
        content : content,
        
      })
      //4. 프론트에 성공했다고 알려주기
      return res.status(200).send('글 등록을 성공했습니다')
    
    } catch (error) {
      res.status(500).json({
        message: 'Creating a post failed!'
      });
    }
  };

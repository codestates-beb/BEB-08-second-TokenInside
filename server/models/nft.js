const Sequelize = require('sequelize');

class Nft extends Sequelize.Model {
  // 스태틱 메소드
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        // 첫번째 객체 인수는 테이블 필드에 대한 설정
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        token_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
        },
        tx_hash: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
          unique: false,
        },
        tokenurl: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false,
        },
      },
      {
        // 두번째 객체 인수는 테이블 자체에 대한 설정
        sequelize /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */,
        timestamps: false /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. */,
        underscored: false /* 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션 */,
        modelName: 'Nft' /* 모델 이름을 설정. */,
        tableName: 'nft' /* 데이터베이스의 테이블 이름. */,
        paranoid: false /* true : deletedAt이라는 컬럼이 생기고 지운 시각이 기록된다. */,
        charset: 'utf8' /* 인코딩 */,
        collate: 'utf8_general_ci',
      },
    );
  }

  // 다른 모델과의 관계
  static associate(db) {
    db.Nft.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      index: false,
    });
    // db.Nft (belongTo) db.User = N:1 관계 이다.
    // db.Nft는 속해있다. db.User에게
  }
}

module.exports = Nft;

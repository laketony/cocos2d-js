package cn.laketony.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import cn.laketony.dto.Signpost;
import cn.laketony.util.MyBatisUtil;

public class DaoSignpost extends LTBaseDao<Signpost> {

	public static DaoSignpost fx() {
		return new DaoSignpost();
	}

	public List<Signpost> getSignposts(int whoid) {

		SqlSession sqlSession = MyBatisUtil.getSqlSession(true);

		String statement = STATEMENT_HEAD + "getRoadsignsList";// 映射sql的标识字符串
		// 执行查询返回一个唯一user对象的sql
		List<Signpost> contents = sqlSession.selectList(statement);
		sqlSession.close();
		return contents;

	}

	/**
	 * @return 失败是-1
	 */
	public int addSignpost(Signpost signpost) {

		SqlSession sqlSession = MyBatisUtil.getSqlSession(true);

		String statement = STATEMENT_HEAD + "addRoadsigns";
		int retResult = sqlSession.insert(statement, signpost);

		sqlSession.close();

		return retResult;

	}
}

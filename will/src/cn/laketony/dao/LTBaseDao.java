package cn.laketony.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import cn.laketony.dto.Signpost;
import cn.laketony.util.MyBatisUtil;

public class LTBaseDao<T> {
	protected String STATEMENT_HEAD = "sqlsMapper.";

	public List<T> getAll(String sqlname) {

		SqlSession sqlSession = MyBatisUtil.getSqlSession(true);

		String statement = STATEMENT_HEAD + sqlname;// 映射sql的标识字符串
		// 执行查询返回一个唯一user对象的sql
		List<T> contents = sqlSession.selectList(statement);
		sqlSession.close();
		return contents;

	}

	/**
	 * @return paperId 失败是-1
	 */
	public int add(String sqlname) {

		SqlSession sqlSession = MyBatisUtil.getSqlSession(true);

		String statement = STATEMENT_HEAD + sqlname;
		int retResult = sqlSession.insert(statement, this);

		sqlSession.close();

		return retResult;

	}
}

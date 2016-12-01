package com.demo.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet Filter implementation class LoginCheck
 * 
 */
//@WebFilter("/*")
public class LoginCheck implements Filter {

	/**
	 * Default constructor.
	 */
	public LoginCheck() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		// place your code here

		// 获得在下面代码中要用的request,response,session对象
		HttpServletRequest servletRequest = (HttpServletRequest) request;
		HttpServletResponse servletResponse = (HttpServletResponse) response;
		HttpSession session = servletRequest.getSession();

		// 获得用户请求的URI
		String path = servletRequest.getRequestURI();
		// System.out.println(path);

		// 登陆页面无需过滤
		if (path.indexOf("/login.jsp") > -1  ) {
			chain.doFilter(servletRequest, servletResponse);
			return;
		}
		// 登陆页面无需过滤
		if (path.indexOf("/api") > -1  ) {
			chain.doFilter(servletRequest, servletResponse);
			return;
		}
		// 登陆页面无需过滤
		if (path.indexOf("/css") > -1  ) {
			chain.doFilter(servletRequest, servletResponse);
			return;
		}
		// 登陆页面无需过滤
		if (path.indexOf("/js") > -1  ) {
			chain.doFilter(servletRequest, servletResponse);
			return;
		}


		// 从session里取员工工号信息
		String username = (String) session.getAttribute("username");

		if (username == null || "".equals(username.trim())) {
			servletResponse.sendRedirect("login.jsp");
			return;
		}

		// pass the request along the filter chain
		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}

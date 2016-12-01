package cn.laketony.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import cn.laketony.ser.PlayerState;

/**
 * Servlet Filter implementation class CheckSessionPlayerid
 */
@WebFilter("/CheckSessionPlayerid")
public class CheckSessionPlayerid implements Filter {

    /**
     * Default constructor. 
     */
    public CheckSessionPlayerid() {
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
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		// place your code here
		
		HttpSession sessoion = ((HttpServletRequest) request).getSession();
		Object playerid_Object = sessoion.getAttribute("playerid");
		if(playerid_Object == null){
			int size = PlayerState.getInstance().playerlist.size();
			int num = (int) (Math.random() * size); // [0,size)
			playerid_Object = num;
			sessoion.setAttribute("playerid", playerid_Object);
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

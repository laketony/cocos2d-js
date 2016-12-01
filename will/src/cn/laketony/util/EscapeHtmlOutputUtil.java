package cn.laketony.util;

public class EscapeHtmlOutputUtil {
	
    private static EscapeHtmlOutputUtil instance=null;
    
    private EscapeHtmlOutputUtil(){
    	
    }
	
	public static EscapeHtmlOutputUtil  getInstance(){
		if(instance==null){
			synchronized (EscapeHtmlOutputUtil.class) {
				if(instance==null){
					instance=new EscapeHtmlOutputUtil();
				}
			}
		}
		return instance;
	}
	
	/**
     * 转义HTML字符串
     * @param str
     * @return
     */
    public Object escapeHtml(Object value)
    {
        if(value == null)
        {
            return null;
        }
         
        if(!(value instanceof String))
        {
            return value;
        }
         
        String str = value.toString();
        StringBuilder sb = new StringBuilder(str.length() + 30);
         
        for(int i = 0, len = str.length(); i < len; i++)
        {
            char c = str.charAt(i);
            // 去除不可见字符
            if((int)c < 32)
            {
                continue;
            }
             
            switch(c)
            {
                case '<':
                    sb.append("&#60;");
                    break;
                case '>':
                    sb.append("&#62;");
                    break;
                case '&':
                    sb.append("&#38;");
                    break;
                case '"':
                    sb.append("&#34;");
                    break;
                case '\'':
                    sb.append("&#39;");
                    break;
                default:
                    sb.append(c);
                    break;
            }
        }
         
        str = null;
         
        return sb.toString();
    }
}

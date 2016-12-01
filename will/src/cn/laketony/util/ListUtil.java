package cn.laketony.util;

import java.util.ArrayList;
import java.util.List;

public class ListUtil {
	
	// ��List�������count������
	private  List<Object> randomTopic( List<Object> list,  int count) {
		// ����һ������Ϊcount(count<=list)������,���ڴ������
		int[] a = new int[count];
		// ���ڴ�������������
		int[] b = new int[list.size()];
		int size = list.size();

		// ȡ�����������a��
		for (int i = 0; i < count; i++) {
			int num = (int) (Math.random() * size); // [0,size)
			int where = -1;
			for (int j = 0; j < b.length; j++) {
				if (b[j] != -1) {
					where++;
					if (where == num) {
						b[j] = -1;
						a[i] = j;
					}
				}
			}
			size = size - 1;
		}
		// a������ �����ݼ��ص�rslist
		List<Object> rslist = new ArrayList<Object>();
		for (int i = 0; i < count; i++) {
			Object df = (Object) list.get(a[i]);
			rslist.add(df);
		}
		return rslist;
	}
}

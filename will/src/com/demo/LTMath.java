package com.demo;

public class LTMath {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		// System.out.println(Color.RED);
	}

	// �㵽ֱ�ߵ���̾�����ж� �㣨x0,y0�� ����������ɵ��߶Σ�x1,y1�� ,( x2,y2 )
	public static double pointToLine(int x1, int y1, int x2, int y2, int x0, int y0) {
		double space = 0;
		double a, b, c;
		a = lineSpace(x1, y1, x2, y2);// �߶εĳ���
		b = lineSpace(x1, y1, x0, y0);// (x1,y1)����ľ���
		c = lineSpace(x2, y2, x0, y0);// (x2,y2)����ľ���
		if (c <= 0.000001 || b <= 0.000001) {
			space = 0;
			return space;
		}
		if (a <= 0.000001) {
			space = b;
			return space;
		}
		if (c * c >= a * a + b * b) {
			space = b;
			return space;
		}
		if (b * b >= a * a + c * c) {
			space = c;
			return space;
		}
		double p = (a + b + c) / 2;// ���ܳ�
		double s = Math.sqrt(p * (p - a) * (p - b) * (p - c));// ���׹�ʽ�����
		space = 2 * s / a;// ���ص㵽�ߵľ��루���������������ʽ��ߣ�
		return space;
	}

	// ��������֮��ľ���
	private static double lineSpace(int x1, int y1, int x2, int y2) {
		double lineLength = 0;
		lineLength = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
		return lineLength;
	}
}

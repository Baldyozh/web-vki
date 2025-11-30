import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccessToken } from '@/utils/jwt';
import { userService } from '@/services/UserService';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Получаем токен из заголовка Authorization или из cookies
    const authHeader = request.headers.get('authorization');
    const tokenFromHeader = authHeader?.replace('Bearer ', '');
    const tokenFromCookie = request.cookies.get('accessToken')?.value;
    const token = tokenFromHeader ?? tokenFromCookie;

    if (!token) {
      return NextResponse.json(
        { message: 'Токен не предоставлен' },
        { status: 401 },
      );
    }

    // Верифицируем токен
    const payload = verifyAccessToken(token);

    if (!payload || typeof payload === 'string') {
      return NextResponse.json(
        { message: 'Невалидный токен' },
        { status: 401 },
      );
    }

    // Получаем ID пользователя из токена
    const payloadObj = payload as Record<string, unknown>;
    const userId = payloadObj.sub;

    if (!userId || typeof userId !== 'number') {
      return NextResponse.json(
        { message: 'Невалидный токен' },
        { status: 401 },
      );
    }

    // Получаем пользователя из базы данных
    const user = await userService.findById(userId);

    if (!user || !user.isActive) {
      return NextResponse.json(
        { message: 'Пользователь не найден или неактивен' },
        { status: 401 },
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  }
  catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json(
      { message: 'Ошибка проверки токена' },
      { status: 500 },
    );
  }
}


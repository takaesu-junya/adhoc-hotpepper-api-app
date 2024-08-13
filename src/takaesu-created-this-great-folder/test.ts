'use server';

import { revalidatePath } from "next/cache";


export async function requestHotPepper(formData: FormData) {
    const HOTPEPPER_API_KEY = process.env.HOTPEPPER_API_KEY || 'API KEY IS NOT SET IN .ENV FILE';
    if (!formData.get('search-keyword')) {
        return [];
    }

    const query = new URLSearchParams();
    query.set('key', HOTPEPPER_API_KEY);
    query.set('format', 'json');
    query.set('large_area', 'Z011');
    query.set('keyword', formData.get('search-keyword') as string);

    const hotPepperRequestUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${query.toString()}`;

    const response = await fetch(hotPepperRequestUrl);
    const data = await response.json();

    const responseData = data.results.shop.map((shop: any) => ({
        id: shop.id,
        name: shop.name,
        logo: shop.logo_image,
        description: shop.catch
    }));

    return responseData;
}


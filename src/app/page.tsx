'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { requestHotPepper } from '@/takaesu-created-this-great-folder/test';
import { useEffect, useState, FormEvent } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('海鮮');

  const fetchData = async (keyword: string) => {
    const formdata = new FormData();
    formdata.append('search-keyword', keyword);
    const response = await requestHotPepper(formdata);
    setData(response);
  };

  useEffect(() => {
    fetchData(searchKeyword);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('search-keyword') as string;
    setSearchKeyword(keyword);
    await fetchData(keyword);
  };

  return (
    <main className="max-w-[20vw] mx-auto">
      <section>
        <form onSubmit={handleSubmit} className="flex">
          <Input name="search-keyword" defaultValue={searchKeyword} />
          <Button type="submit">Search</Button>
        </form>
      </section>
      <section>
        {data.map((item: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <Avatar>
                <AvatarImage src={item.logo} alt={item.name} />
                <AvatarFallback className="text-2xl">🤗</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

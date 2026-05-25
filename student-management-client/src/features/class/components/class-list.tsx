"use client";

import { CLASSES } from "@/constants/common";
import { LANGUAGES } from "@/constants/language";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ClassList = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openStudent, setOpenStudent] = useState(true);

  return (
    <div className="min-h-screen bg-[#f0f4f7] font-sans">
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-[#5046e5] px-8 py-3">
        <h2 className="text-xl font-semibold text-white">
          {LANGUAGES.STUDENT_MANAGEMENT}
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-1 text-[#7163ba]">
            <button type="button">
              <Search size={20} />
            </button>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent px-2 py-2 text-sm outline-none"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-3"
            >
              <Image
                src="/images/account.jpg"
                alt="Account"
                width={35}
                height={35}
                className="rounded-full"
              />
              <span className="text-sm font-medium text-white">
                Vũ Trọng Sang
              </span>
            </button>

            {openMenu && (
              <div className="absolute right-0 top-12 w-40 rounded-xl border bg-white p-3 shadow-lg">
                <Link href="#" className="flex items-center gap-2 py-2 text-sm">
                  <Image src="/images/user.png" alt="" width={20} height={20} />
                  Profile
                </Link>

                <Link href="#" className="flex items-center gap-2 py-2 text-sm">
                  <Image
                    src="/images/settings.png"
                    alt=""
                    width={20}
                    height={20}
                  />
                  Setting
                </Link>

                <Link
                  href="/login"
                  className="flex items-center gap-2 py-2 text-sm"
                >
                  <Image
                    src="/images/log-out.png"
                    alt=""
                    width={20}
                    height={20}
                  />
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-[258px_1fr]">
        <aside className="sticky top-0 h-screen bg-white px-3 pt-24 shadow-sm">
          <div className="mb-8 flex justify-center">
            <Image src="/images/U.png" alt="Logo" width={110} height={110} />
          </div>

          <ul className="relative h-[80%] space-y-2 text-[15px] font-medium text-[#858c96]">
            <li>
              <Link
                href="/home"
                className="flex items-center gap-4 rounded px-4 py-3 hover:bg-[#5046e5] hover:text-white"
              >
                <Image
                  src="/images/dashboard.png"
                  alt=""
                  width={20}
                  height={20}
                />
                Trang Chủ
              </Link>
            </li>

            <li>
              <button
                type="button"
                onClick={() => setOpenStudent(!openStudent)}
                className="flex w-full items-center gap-4 rounded px-4 py-3 hover:bg-[#5046e5] hover:text-white"
              >
                <Image src="/images/user.png" alt="" width={20} height={20} />
                <span>Sinh Viên</span>
                <ChevronDown size={18} className="ml-auto" />
              </button>

              {openStudent && (
                <ul className="space-y-1 bg-white">
                  <li>
                    <Link
                      href="/students"
                      className="block rounded py-3 pl-14 hover:bg-[#5046e5] hover:text-white"
                    >
                      Danh Sách
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/students/score"
                      className="block rounded py-3 pl-14 hover:bg-[#5046e5] hover:text-white"
                    >
                      Điểm SV
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/classes"
                className="flex items-center gap-4 rounded bg-[#5046e5] px-4 py-3 text-white"
              >
                <Image
                  src="/images/online-class.png"
                  alt=""
                  width={20}
                  height={20}
                />
                Lớp
              </Link>
            </li>

            <li>
              <Link
                href="/subjects"
                className="flex items-center gap-4 rounded px-4 py-3 hover:bg-[#5046e5] hover:text-white"
              >
                <Image
                  src="/images/elearning1.png"
                  alt=""
                  width={20}
                  height={20}
                />
                Môn Học
              </Link>
            </li>

            <li>
              <Link
                href="/notifications"
                className="flex items-center gap-4 rounded px-4 py-3 hover:bg-[#5046e5] hover:text-white"
              >
                <Image
                  src="/images/notification.png"
                  alt=""
                  width={20}
                  height={20}
                />
                Thông Báo
              </Link>
            </li>

            <li className="absolute bottom-0 w-full">
              <Link
                href="/login"
                className="flex items-center gap-4 rounded px-4 py-3 hover:bg-[#5046e5] hover:text-white"
              >
                <Image
                  src="/images/log-out.png"
                  alt=""
                  width={20}
                  height={20}
                />
                Đăng Xuất
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main */}
        <main className="pt-24">
          <ol className="mx-5 mb-6 flex items-center text-lg">
            <li>
              <Link href="/students" className="text-blue-500">
                Students
              </Link>
            </li>
            <li className="ml-2 text-gray-400">/ Class</li>
          </ol>

          <section className="mx-5 rounded">
            <h1 className="mb-8 pl-4 text-3xl font-semibold text-[#576169]">
              Class List
            </h1>

            <div className="m-3 w-full max-w-5xl border bg-white shadow-sm">
              <div className="p-5">
                <button
                  type="button"
                  className="mb-5 w-36 rounded-lg bg-white px-5 py-3 font-medium shadow-md hover:bg-[#5046e5] hover:text-white"
                >
                  Add Class
                </button>

                <table className="w-full overflow-hidden rounded-t-xl shadow-md">
                  <thead className="bg-[#5046e5] text-white">
                    <tr className="grid grid-cols-3">
                      <th className="px-6 py-4 text-left text-lg">Mã Lớp</th>
                      <th className="px-6 py-4 text-left text-lg">Tên Lớp</th>
                      <th className="px-6 py-4 text-left text-lg">Niên Khóa</th>
                    </tr>
                  </thead>

                  <tbody className="block rounded-b bg-white shadow-md">
                    {CLASSES.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`grid grid-cols-3 px-2 py-4 text-lg transition hover:scale-[1.01] hover:shadow-lg ${index % 2 === 1 ? "bg-gray-100" : "bg-white"
                          }`}
                      >
                        <td className="px-4">{item.id}</td>
                        <td className="px-4">{item.name}</td>
                        <td className="px-4">{item.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ClassList;
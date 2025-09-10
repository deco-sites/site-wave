import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { ComponentChildren, Fragment } from "preact";
import { BlogPost } from "apps/blog/types.ts";
import { useId } from "../../sdk/useId.ts";
import { useSection as useSection } from "@deco/deco/hooks";
import BlogFilter from "../../islands/BlogFilter.tsx";
export interface CTA {
  text?: string;
}
/** @title {{{title}}} */
export interface Post {
  url?: string;
  title?: string;
  author?: string;
  image?: ImageWidget;
  date?: string;
  readingTime?: string;
  tags?: string[];
}
export interface Props {
  cta?: CTA;
  posts?: BlogPost[] | null;
  pagination?: {
    /**
     * @title First page
     * @description Leave it as 0 to start from the first page
     */
    page?: number;
    /** @title items per page */
    perPage?: number;
  };
}
function Container({ children }: {
  children: ComponentChildren;
}) {
  return (
    <div class="container lg:mx-auto lg:py-14 mx-2 py-12 text-sm text-white">
      <div class="space-y-8">{children}</div>
    </div>
  );
}
export default function BlogPosts(
  {
    cta = { text: "Show more" },
    posts,
    pagination: { page = 0, perPage = 6 } = {},
  }: Props,
) {
  const from = perPage * page;
  const to = perPage * (page + 1);
  // It's boring to generate ids. Let's autogen them
  const postList = useId();
  // Get the HTMX link for this section
  const fetchMoreLink = useSection({
    // Renders this section with the next page
    props: {
      pagination: { perPage, page: page + 1 },
    },
  });
  function calculateReadingTime(words: number): string {
    const wordsPerMinute = 250;
    const estimatedTimeMinutes = words / wordsPerMinute;
    const roundedReadingTime = Math.round(estimatedTimeMinutes);
    return `${roundedReadingTime}`;
  }
  const ContainerComponent = page === 0 ? Container : Fragment;

  // Extrair todas as categorias únicas dos posts
  const allCategories = posts
    ? [
      ...new Set(
        posts.flatMap((post) => post.categories?.map((cat) => cat.name) || []),
      ),
    ]
    : [];

  return (
    <ContainerComponent>
      <div class="container px-4">
        <BlogFilter categories={allCategories} />
        <div
          class="gap-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 mt-16"
          id="posts-grid"
        >
          {posts?.slice(from, to).map((post) => (
            <div
              class="overflow-hidden rounded-lg post-card"
              data-title={post.title?.toLowerCase() || ""}
              data-content={post.content?.toLowerCase() || ""}
              data-categories={post.categories?.map((cat) => cat.name).join(
                ",",
              ) || ""}
            >
              <a href={`/blog/${post.slug}`}>
                <Image
                  width={360}
                  height={232}
                  class="object-cover w-full rounded-2xl"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={post.image || ""}
                  alt={post.title || ""}
                  decoding="async"
                  loading="lazy"
                />
                <div class="pb-6">
                  <div class="flex justify-between items-center py-5">
                    <div>
                      {post.categories?.map((category) => (
                        <div class="text-primary text-xs text-[#0066E4]">
                          {category.name}
                        </div>
                      ))}
                    </div>
                    <div class="text-[#717171] text-sm flex gap-[3px] items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          d="M10 2.53125C8.42393 2.53125 6.88326 2.99861 5.5728 3.87423C4.26235 4.74984 3.24097 5.99439 2.63784 7.45049C2.0347 8.90659 1.87689 10.5088 2.18437 12.0546C2.49185 13.6004 3.2508 15.0203 4.36525 16.1348C5.4797 17.2492 6.89959 18.0082 8.44538 18.3156C9.99116 18.6231 11.5934 18.4653 13.0495 17.8622C14.5056 17.259 15.7502 16.2377 16.6258 14.9272C17.5014 13.6167 17.9688 12.0761 17.9688 10.5C17.9663 8.38732 17.1259 6.36188 15.632 4.86798C14.1381 3.37409 12.1127 2.53373 10 2.53125ZM10 17.5312C8.60935 17.5312 7.24993 17.1189 6.09365 16.3463C4.93737 15.5737 4.03615 14.4755 3.50398 13.1907C2.9718 11.906 2.83255 10.4922 3.10386 9.12827C3.37516 7.76434 4.04482 6.51149 5.02816 5.52816C6.0115 4.54482 7.26435 3.87516 8.62827 3.60385C9.9922 3.33255 11.406 3.47179 12.6907 4.00397C13.9755 4.53615 15.0737 5.43736 15.8463 6.59365C16.6189 7.74993 17.0313 9.10935 17.0313 10.5C17.0292 12.3642 16.2877 14.1514 14.9696 15.4696C13.6514 16.7877 11.8642 17.5292 10 17.5312ZM14.8438 10.5C14.8438 10.6243 14.7944 10.7435 14.7065 10.8315C14.6186 10.9194 14.4993 10.9688 14.375 10.9688H10C9.87568 10.9688 9.75646 10.9194 9.66855 10.8315C9.58064 10.7435 9.53125 10.6243 9.53125 10.5V6.125C9.53125 6.00068 9.58064 5.88145 9.66855 5.79354C9.75646 5.70564 9.87568 5.65625 10 5.65625C10.1243 5.65625 10.2436 5.70564 10.3315 5.79354C10.4194 5.88145 10.4688 6.00068 10.4688 6.125V10.0312H14.375C14.4993 10.0312 14.6186 10.0806 14.7065 10.1685C14.7944 10.2565 14.8438 10.3757 14.8438 10.5Z"
                          fill="#717171"
                        />
                      </svg>
                      <b>
                        {calculateReadingTime(post.content.split(" ").length)}
                        {" "}
                        minutos
                      </b>{" "}
                      de leitura
                    </div>
                  </div>
                  <div class="space-y-2">
                    <h3 class="text-2xl text-white font-semibold">
                      {post.title}
                    </h3>
                  </div>
                  <div
                    class="text-[#717171] text-base max-h-[70px] overflow-hidden text-ellipsis mt-4 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: post?.content,
                    }}
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      {posts && to < posts.length && (
        <div class="flex justify-center w-full" id={postList}>
          <button
            hx-get={fetchMoreLink}
            hx-swap="outerHTML"
            hx-target={`#${postList}`}
            aria-label={cta.text}
            class="btn btn-primary px-4 py-2 rounded-full"
          >
            <span class="inline [.htmx-request_&]:hidden text-white">
              {cta.text}
            </span>
            <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
          </button>
        </div>
      )}
    </ContainerComponent>
  );
}

export const LoadingFallback = (props: Props) => {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
};

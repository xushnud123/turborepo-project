import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, Meta, Links, ScrollRestoration, Scripts, NavLink, useNavigate, Navigate, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import { useState, useMemo } from "react";
import { httpBatchLink } from "@trpc/client";
import { X, Menu, ArrowLeft, ArrowRight, Loader2, LogOut, User, Database, PackagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const trpc = createTRPCReact();
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout$1({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => trpc.createClient({
    links: [httpBatchLink({
      url: "http://localhost:5001/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include"
          // 👈 Cookie-larni serverga olib boradi
        });
      }
    })]
  }));
  return /* @__PURE__ */ jsx(trpc.Provider, {
    client: trpcClient,
    queryClient,
    children: /* @__PURE__ */ jsx(QueryClientProvider, {
      client: queryClient,
      children: /* @__PURE__ */ jsx(Outlet, {})
    })
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout: Layout$1,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-white",
    children: [/* @__PURE__ */ jsxs("nav", {
      className: "fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100",
      children: [/* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex justify-between h-16 items-center",
          children: [/* @__PURE__ */ jsx("div", {
            className: "shrink-0 flex items-center",
            children: /* @__PURE__ */ jsx("span", {
              className: "text-2xl font-bold text-indigo-600",
              children: "Brand."
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "hidden md:flex space-x-8 items-center",
            children: [/* @__PURE__ */ jsx("a", {
              href: "#",
              className: "text-gray-600 hover:text-indigo-600 font-medium",
              children: "Features"
            }), /* @__PURE__ */ jsx("a", {
              href: "#",
              className: "text-gray-600 hover:text-indigo-600 font-medium",
              children: "Pricing"
            }), /* @__PURE__ */ jsx("a", {
              href: "#",
              className: "text-gray-600 hover:text-indigo-600 font-medium",
              children: "Company"
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center space-x-4 pl-4 border-l border-gray-200",
              children: [/* @__PURE__ */ jsx(NavLink, {
                to: "/login",
                className: "text-gray-600 hover:text-indigo-600 font-semibold px-3 py-2",
                children: "Sign In"
              }), /* @__PURE__ */ jsx(NavLink, {
                to: "/register",
                className: "bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm",
                children: "Sign Up"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "md:hidden flex items-center",
            children: /* @__PURE__ */ jsx("button", {
              onClick: () => setIsOpen(!isOpen),
              className: "text-gray-600 hover:text-indigo-600 focus:outline-none",
              children: isOpen ? /* @__PURE__ */ jsx(X, {
                size: 28
              }) : /* @__PURE__ */ jsx(Menu, {
                size: 28
              })
            })
          })]
        })
      }), isOpen && /* @__PURE__ */ jsx("div", {
        className: "md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300",
        children: /* @__PURE__ */ jsxs("div", {
          className: "px-2 pt-2 pb-3 space-y-1 sm:px-3",
          children: [/* @__PURE__ */ jsx("a", {
            href: "#",
            className: "block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-md",
            children: "Features"
          }), /* @__PURE__ */ jsx("a", {
            href: "#",
            className: "block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-md",
            children: "Pricing"
          }), /* @__PURE__ */ jsx("a", {
            href: "#",
            className: "block px-3 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-md",
            children: "Company"
          }), /* @__PURE__ */ jsx("hr", {
            className: "my-2 border-gray-100"
          }), /* @__PURE__ */ jsx("button", {
            className: "w-full text-left px-3 py-2 text-gray-600 font-semibold hover:bg-gray-50 rounded-md",
            children: "Sign In"
          }), /* @__PURE__ */ jsx("button", {
            className: "w-full mt-2 bg-indigo-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-indigo-700",
            children: "Sign Up"
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("main", {
      className: "pt-32 pb-16 px-4",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto text-center",
        children: [/* @__PURE__ */ jsxs("h1", {
          className: "text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight",
          children: ["Build something ", /* @__PURE__ */ jsx("span", {
            className: "text-indigo-600",
            children: "amazing"
          }), " ", "today."]
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-6 text-xl text-gray-500 max-w-2xl mx-auto",
          children: "The most flexible and intuitive platform to manage your workflow. Join 10,000+ teams who are scaling faster than ever."
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-10 flex justify-center gap-4",
          children: [/* @__PURE__ */ jsx("button", {
            className: "bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95",
            children: "Start Free Trial"
          }), /* @__PURE__ */ jsx("button", {
            className: "bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all",
            children: "Watch Demo"
          })]
        })]
      })
    })]
  });
};
const home = UNSAFE_withComponentProps(Home);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const Layout = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "block",
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
};
const layout = UNSAFE_withComponentProps(Layout);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      setAuth: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setHasHydrated: (state) => set({ hasHydrated: state })
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
const getUser = () => useAuthStore((s) => s.user);
const useHydrated = () => useAuthStore((s) => s.hasHydrated);
const setUser = (user) => {
  if (user) useAuthStore.getState().setAuth(user);
  else useAuthStore.getState().logout();
};
const LoginPage = () => {
  const navigate = useNavigate();
  const {
    mutate,
    isPending
  } = trpc.auth.login.useMutation({
    onSuccess(data) {
      setUser(data);
      navigate("/dashboard/personal", {
        replace: true
      });
    }
  });
  const {
    register: register2,
    handleSubmit
  } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "sm:mx-auto sm:w-full sm:max-w-md text-center",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-3xl font-extrabold text-gray-900",
        children: "Hisobga kirish"
      }), /* @__PURE__ */ jsxs("p", {
        className: "mt-2 text-sm text-gray-600",
        children: ["Yoki", " ", /* @__PURE__ */ jsx(NavLink, {
          to: "/register",
          className: "font-medium text-indigo-600 hover:text-indigo-500",
          children: "yangi hisob oching"
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md",
      children: /* @__PURE__ */ jsx("div", {
        className: "bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10",
        children: /* @__PURE__ */ jsxs("form", {
          className: "space-y-6",
          onSubmit: handleSubmit(onSubmit),
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block text-sm font-medium text-gray-700",
              children: "Email manzilingiz"
            }), /* @__PURE__ */ jsx("input", {
              type: "email",
              ...register2("email"),
              required: true,
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block text-sm font-medium text-gray-700",
              children: "Parol"
            }), /* @__PURE__ */ jsx("input", {
              type: "password",
              ...register2("password"),
              required: true,
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center",
              children: [/* @__PURE__ */ jsx("input", {
                type: "checkbox",
                className: "h-4 w-4 text-indigo-600 border-gray-300 rounded"
              }), /* @__PURE__ */ jsx("label", {
                className: "ml-2 block text-sm text-gray-900",
                children: "Eslab qolish"
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "text-sm",
              children: /* @__PURE__ */ jsx(NavLink, {
                to: "/forgot-password",
                className: "font-medium text-indigo-600 hover:text-indigo-500",
                children: "Parolni unutdingizmi?"
              })
            })]
          }), /* @__PURE__ */ jsx("button", {
            type: "submit",
            disabled: isPending,
            className: cn("w-full mt-4 flex justify-center py-2 px-4 border rounded-md text-white transition", isPending ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"),
            children: "Kirish"
          })]
        })
      })
    })]
  });
};
const login = UNSAFE_withComponentProps(LoginPage);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
const ForgotPassword = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6",
    children: /* @__PURE__ */ jsx("div", {
      className: "sm:mx-auto sm:w-full sm:max-w-md",
      children: /* @__PURE__ */ jsxs("div", {
        className: "bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 text-center",
        children: [/* @__PURE__ */ jsx("div", {
          className: "w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4",
          children: /* @__PURE__ */ jsx("svg", {
            className: "w-8 h-8",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              d: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            })
          })
        }), /* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold text-gray-900",
          children: "Parolni unutdingizmi?"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-2 text-sm text-gray-600 mb-8",
          children: "Havotir olmang, biz sizga tiklash ko'rsatmalarini yuboramiz."
        }), /* @__PURE__ */ jsxs("form", {
          className: "space-y-6 text-left",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block text-sm font-medium text-gray-700",
              children: "Email manzilingiz"
            }), /* @__PURE__ */ jsx("input", {
              type: "email",
              placeholder: "misol@mail.com",
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            })]
          }), /* @__PURE__ */ jsx("button", {
            className: "w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition",
            children: "Parolni tiklash"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-6",
          children: /* @__PURE__ */ jsxs(NavLink, {
            to: "/login",
            className: "text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-2",
            children: [/* @__PURE__ */ jsx(ArrowLeft, {
              size: 16
            }), " Ortga qaytish"]
          })
        })]
      })
    })
  });
};
const forgotPassword = UNSAFE_withComponentProps(ForgotPassword);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: forgotPassword
}, Symbol.toStringTag, { value: "Module" }));
const RegisterSchema = z.object({
  email: z.string().email("Email formati noto'g'ri"),
  name: z.string().min(2, "Ism juda qisqa"),
  password: z.string().min(6, "Parol kamida 6 ta belgi bo'lishi kerak")
});
RegisterSchema.pick({
  email: true,
  password: true
});
const Register = () => {
  const navigate = useNavigate();
  const {
    register: register2,
    handleSubmit
  } = useForm();
  const {
    mutate,
    isPending
  } = trpc.auth.register.useMutation({
    onSuccess(data) {
      console.log(data);
      setUser(data);
      navigate("/dashboard/personal", {
        replace: true
      });
    }
  });
  const onSubmit = (data) => {
    const {
      passwordRequired,
      ...newUser
    } = data;
    mutate({
      ...newUser
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8",
    children: [/* @__PURE__ */ jsx("div", {
      className: "sm:mx-auto sm:w-full sm:max-w-md text-center",
      children: /* @__PURE__ */ jsx("h2", {
        className: "text-3xl font-extrabold text-gray-900",
        children: "Ro'yxatdan o'tish"
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md",
      children: /* @__PURE__ */ jsx("div", {
        className: "bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10",
        children: /* @__PURE__ */ jsxs("form", {
          className: "space-y-4",
          onSubmit: handleSubmit(onSubmit),
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block text-sm font-medium text-gray-700",
              children: "To'liq ismingiz"
            }), /* @__PURE__ */ jsx("input", {
              type: "text",
              ...register2("name"),
              required: true,
              placeholder: "Ali Valiyev",
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block text-sm font-medium text-gray-700",
              children: "Email"
            }), /* @__PURE__ */ jsx("input", {
              type: "email",
              ...register2("email"),
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block text-sm font-medium text-gray-700",
              children: "Parol yarating"
            }), /* @__PURE__ */ jsx("input", {
              type: "password",
              placeholder: "••••••••",
              ...register2("password"),
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block text-sm font-medium text-gray-700",
              children: "Parolni tasdiqlang"
            }), /* @__PURE__ */ jsx("input", {
              type: "password",
              placeholder: "••••••••",
              ...register2("passwordRequired"),
              className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            })]
          }), /* @__PURE__ */ jsx("button", {
            type: "submit",
            disabled: isPending,
            className: cn("w-full mt-4 flex justify-center py-2 px-4 border rounded-md text-white transition", isPending ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"),
            children: isPending ? "Yuborilmoqda..." : "Hisob yaratish"
          }), /* @__PURE__ */ jsxs(NavLink, {
            to: "/login",
            type: "submit",
            className: "w-max mx-auto mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium items-center gap-3 text-indigo-600 hover:text-indigo-700 transition",
            children: ["Login ", /* @__PURE__ */ jsx(ArrowRight, {
              size: 16
            })]
          })]
        })
      })
    })]
  });
};
const register = UNSAFE_withComponentProps(Register);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: register
}, Symbol.toStringTag, { value: "Module" }));
const PrivateRoute = ({
  children
}) => {
  const user = getUser();
  const hydrated = useHydrated();
  if (!hydrated) return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen grid place-items-center bg-slate-100",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-sm border border-slate-200",
      children: [/* @__PURE__ */ jsx(Loader2, {
        className: "h-5 w-5 animate-spin text-blue-600"
      }), /* @__PURE__ */ jsx("span", {
        className: "text-slate-700 font-medium",
        children: "Yuklanmoqda..."
      })]
    })
  });
  if (!user) return /* @__PURE__ */ jsx(Navigate, {
    to: "/login",
    replace: true
  });
  return children ? /* @__PURE__ */ jsx(Fragment, {
    children
  }) : /* @__PURE__ */ jsx(Outlet, {});
};
const privateRoute = UNSAFE_withComponentProps(PrivateRoute);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: privateRoute
}, Symbol.toStringTag, { value: "Module" }));
const Layouts = ({}) => {
  const location = useLocation();
  const activeTab = location.pathname.split("/").pop();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  if (activeTab === "dashboard") {
    navigate("/dashboard/personal");
  }
  const user = getUser();
  const menuItems = [{
    id: "personal",
    name: "Personal Data",
    icon: /* @__PURE__ */ jsx(User, {
      size: 20
    })
  }, {
    id: "product",
    name: "All Data",
    icon: /* @__PURE__ */ jsx(Database, {
      size: 20
    })
  }, {
    id: "add-product",
    name: "Add Product",
    icon: /* @__PURE__ */ jsx(PackagePlus, {
      size: 20
    })
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-50 flex",
    children: [/* @__PURE__ */ jsxs("aside", {
      className: `bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} flex flex-col`,
      children: [/* @__PURE__ */ jsxs("div", {
        className: "h-16 flex items-center justify-between px-6 border-b border-gray-100",
        children: [isSidebarOpen && /* @__PURE__ */ jsx("div", {
          className: "h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs",
          children: user?.name.slice(0, 2)
        }), /* @__PURE__ */ jsx("button", {
          onClick: () => setIsSidebarOpen(!isSidebarOpen),
          className: "p-1 hover:bg-gray-100 rounded-lg text-gray-500",
          children: isSidebarOpen ? /* @__PURE__ */ jsx(X, {
            size: 20
          }) : /* @__PURE__ */ jsx(Menu, {
            size: 20
          })
        })]
      }), /* @__PURE__ */ jsx("nav", {
        className: "flex-1 p-4 space-y-2",
        children: menuItems.map((item) => /* @__PURE__ */ jsxs(NavLink, {
          to: `/dashboard/${item.id}`,
          className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"}`,
          children: [item.icon, isSidebarOpen && /* @__PURE__ */ jsx("span", {
            className: "font-medium",
            children: item.name
          })]
        }, item.id))
      }), /* @__PURE__ */ jsx("div", {
        className: "p-4 border-t border-gray-100",
        children: /* @__PURE__ */ jsxs("button", {
          onClick: () => setUser(null),
          className: "w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium",
          children: [/* @__PURE__ */ jsx(LogOut, {
            size: 20
          }), isSidebarOpen && /* @__PURE__ */ jsx("span", {
            children: "Chiqish"
          })]
        })
      })]
    }), /* @__PURE__ */ jsx("main", {
      className: "flex-1 flex flex-col  overflow-hidden h-[100vh] px-4 py-5",
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
};
const layouts = UNSAFE_withComponentProps(Layouts);
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layouts
}, Symbol.toStringTag, { value: "Module" }));
const Dashboard = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 flex",
    children: /* @__PURE__ */ jsx("main", {
      className: "flex-1 flex flex-col",
      children: /* @__PURE__ */ jsx(Outlet, {})
    })
  });
};
const dashboard = UNSAFE_withComponentProps(Dashboard);
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard
}, Symbol.toStringTag, { value: "Module" }));
const profile = UNSAFE_withComponentProps(function ProfilePage() {
  const user = getUser();
  const initials = user?.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen  p-6 md:p-10",
    children: /* @__PURE__ */ jsx("div", {
      className: "mx-auto max-w-3xl",
      children: /* @__PURE__ */ jsxs("div", {
        className: "relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10",
        children: [/* @__PURE__ */ jsx("div", {
          className: "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-100 blur-3xl"
        }), /* @__PURE__ */ jsx("div", {
          className: "pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-100 blur-3xl"
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative z-10",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs uppercase tracking-[0.25em] text-cyan-700",
            children: "User Profile"
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-6 flex flex-col gap-6 md:flex-row md:items-center",
            children: [/* @__PURE__ */ jsx("div", {
              className: "grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl font-bold text-white shadow-lg",
              children: initials
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h1", {
                className: "text-3xl font-bold text-slate-800",
                children: user?.name
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-slate-600",
                children: user?.email
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-8 grid gap-4 md:grid-cols-2",
            children: [/* @__PURE__ */ jsx(InfoBlock, {
              label: "Full Name",
              value: user?.name
            }), /* @__PURE__ */ jsx(InfoBlock, {
              label: "Email Address",
              value: user?.email
            }), /* @__PURE__ */ jsx(InfoBlock, {
              label: "User ID",
              value: user?.id,
              full: true
            })]
          })]
        })]
      })
    })
  });
});
function InfoBlock({
  label,
  value,
  full
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: `rounded-2xl border border-slate-200 bg-slate-50 p-4 ${full ? "md:col-span-2" : ""}`,
    children: [/* @__PURE__ */ jsx("p", {
      className: "text-xs uppercase tracking-wider text-slate-500",
      children: label
    }), /* @__PURE__ */ jsx("p", {
      className: "mt-1 break-all font-medium text-slate-800",
      children: value
    })]
  });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profile
}, Symbol.toStringTag, { value: "Module" }));
const addProduct = UNSAFE_withComponentProps(function AddProductPage() {
  const {
    register: register2,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm();
  const {
    mutate,
    isPending
  } = trpc.products.create.useMutation();
  const onSubmit = async (data) => {
    mutate(data);
    reset();
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-slate-100 p-6 md:p-10",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-2xl font-bold text-slate-800",
        children: "Add Product"
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-1 text-sm text-slate-500",
        children: "Title, description va price kiriting."
      }), /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSubmit(onSubmit),
        className: "mt-6 space-y-4",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            className: "mb-1 block text-sm font-medium text-slate-700",
            children: "Title"
          }), /* @__PURE__ */ jsx("input", {
            type: "text",
            ...register2("title", {
              required: "Title majburiy",
              minLength: {
                value: 3,
                message: "Kamida 3 ta belgi kiriting"
              }
            }),
            className: "w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
            placeholder: "Product title"
          }), errors.title && /* @__PURE__ */ jsx("p", {
            className: "mt-1 text-sm text-red-600",
            children: errors.title.message
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            className: "mb-1 block text-sm font-medium text-slate-700",
            children: "Description"
          }), /* @__PURE__ */ jsx("textarea", {
            rows: 4,
            ...register2("description", {
              required: "Description majburiy",
              minLength: {
                value: 10,
                message: "Kamida 10 ta belgi kiriting"
              }
            }),
            className: "w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
            placeholder: "Product description"
          }), errors.description && /* @__PURE__ */ jsx("p", {
            className: "mt-1 text-sm text-red-600",
            children: errors.description.message
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            className: "mb-1 block text-sm font-medium text-slate-700",
            children: "Price"
          }), /* @__PURE__ */ jsx("input", {
            type: "number",
            step: "0.01",
            ...register2("price", {
              required: "Price majburiy",
              valueAsNumber: true,
              min: {
                value: 0.01,
                message: "Price 0 dan katta bo‘lishi kerak"
              }
            }),
            className: "w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
            placeholder: "99.99"
          }), errors.price && /* @__PURE__ */ jsx("p", {
            className: "mt-1 text-sm text-red-600",
            children: errors.price.message
          })]
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          disabled: isPending,
          className: "w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60",
          children: isPending ? "Saving..." : "Save Product"
        })]
      })]
    })
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: addProduct
}, Symbol.toStringTag, { value: "Module" }));
const modules = [AllCommunityModule];
const tableData = UNSAFE_withComponentProps(function ProductsTablePage() {
  const {
    data = []
  } = trpc.products.getAll.useQuery();
  const columnDefs = useMemo(() => [{
    field: "title",
    headerName: "Title",
    minWidth: 180
  }, {
    field: "description",
    headerName: "Description",
    minWidth: 220
  }, {
    field: "price",
    headerName: "Price",
    minWidth: 140
  }, {
    field: "userId",
    headerName: "User ID",
    minWidth: 240
  }, {
    field: "createdAt",
    headerName: "Created At",
    minWidth: 190,
    valueFormatter: (p) => new Date(p.value).toLocaleString("uz-UZ")
  }, {
    field: "updatedAt",
    headerName: "Updated At",
    minWidth: 190,
    valueFormatter: (p) => new Date(p.value).toLocaleString("uz-UZ")
  }, {
    field: "id",
    headerName: "Action",
    minWidth: 140,
    sortable: false,
    filter: false,
    cellRenderer: () => /* @__PURE__ */ jsx("button", {
      className: "rounded-lg bg-red-600 px-3 text-white",
      children: "Delete"
    })
  }], []);
  return /* @__PURE__ */ jsx("div", {
    className: "ag-theme-quartz h-140 w-full rounded-xl ",
    children: /* @__PURE__ */ jsx(AgGridReact, {
      modules,
      rowData: data,
      columnDefs,
      pagination: true,
      paginationPageSize: 10
    })
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tableData
}, Symbol.toStringTag, { value: "Module" }));
const NotFoundPage = () => {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-white flex items-center justify-center px-6",
    children: /* @__PURE__ */ jsxs("div", {
      className: "text-center",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-6xl font-bold text-indigo-600",
        children: "404"
      }), /* @__PURE__ */ jsx("h1", {
        className: "mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl",
        children: "Sahifa topilmadi"
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-6 text-base leading-7 text-gray-600",
        children: "Uzr, siz qidirayotgan sahifa mavjud emas yoki ko'chirib yuborilgan."
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-10 flex items-center justify-center gap-x-6",
        children: /* @__PURE__ */ jsx(NavLink, {
          to: "/",
          className: "rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
          children: "Bosh sahifaga qaytish"
        })
      })]
    })
  });
};
const notFound = UNSAFE_withComponentProps(NotFoundPage);
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: notFound
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CfL-WwV-.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js", "/assets/index-hyHjChhO.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/root-DRuTfY4a.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js", "/assets/index-hyHjChhO.js", "/assets/trpc-DvcFyADL.js"], "css": ["/assets/root-CWjV_Bq7.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-CbzzXOHn.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js", "/assets/x-Dlfi_tjc.js", "/assets/createLucideIcon-CEUGaV3Z.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth/layout": { "id": "routes/auth/layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/layout-y3lfq4Se.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth/login/login": { "id": "routes/auth/login/login", "parentId": "routes/auth/layout", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-4G2l8K4a.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js", "/assets/index.esm-CrUXfc5B.js", "/assets/trpc-DvcFyADL.js", "/assets/cn-C8nBGPD0.js", "/assets/auth-store-C8H-mYak.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth/forgot-password/forgot-password": { "id": "routes/auth/forgot-password/forgot-password", "parentId": "routes/auth/layout", "path": "forgot-password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/forgot-password-DtaqaBgf.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js", "/assets/createLucideIcon-CEUGaV3Z.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth/register/register": { "id": "routes/auth/register/register", "parentId": "routes/auth/layout", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/register-DIII-SxP.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js", "/assets/index.esm-CrUXfc5B.js", "/assets/trpc-DvcFyADL.js", "/assets/auth-store-C8H-mYak.js", "/assets/cn-C8nBGPD0.js", "/assets/createLucideIcon-CEUGaV3Z.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/private-route": { "id": "routes/dashboard/private-route", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/private-route-DsJ43BJk.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js", "/assets/auth-store-C8H-mYak.js", "/assets/createLucideIcon-CEUGaV3Z.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/layouts": { "id": "routes/dashboard/layouts", "parentId": "routes/dashboard/private-route", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/layouts-gFr7F8e1.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js", "/assets/auth-store-C8H-mYak.js", "/assets/x-Dlfi_tjc.js", "/assets/createLucideIcon-CEUGaV3Z.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/dashboard": { "id": "routes/dashboard/dashboard", "parentId": "routes/dashboard/layouts", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-sxlR9E5P.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/profile/profile": { "id": "routes/dashboard/profile/profile", "parentId": "routes/dashboard/dashboard", "path": "personal", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile-pWbABbnP.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js", "/assets/auth-store-C8H-mYak.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/add-product/add-product": { "id": "routes/dashboard/add-product/add-product", "parentId": "routes/dashboard/dashboard", "path": "add-product", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/add-product-B70MxpWU.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js", "/assets/index.esm-CrUXfc5B.js", "/assets/trpc-DvcFyADL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/table-data/table-data": { "id": "routes/dashboard/table-data/table-data", "parentId": "routes/dashboard/dashboard", "path": "product", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/table-data-CUy173ED.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js", "/assets/index-hyHjChhO.js", "/assets/trpc-DvcFyADL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/not-found": { "id": "routes/not-found", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/not-found-BTD5fllT.js", "imports": ["/assets/chunk-EPOLDU6W-CNuB5XRQ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-a394e014.js", "version": "a394e014", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": true, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/auth/layout": {
    id: "routes/auth/layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/auth/login/login": {
    id: "routes/auth/login/login",
    parentId: "routes/auth/layout",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/auth/forgot-password/forgot-password": {
    id: "routes/auth/forgot-password/forgot-password",
    parentId: "routes/auth/layout",
    path: "forgot-password",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/auth/register/register": {
    id: "routes/auth/register/register",
    parentId: "routes/auth/layout",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/dashboard/private-route": {
    id: "routes/dashboard/private-route",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/dashboard/layouts": {
    id: "routes/dashboard/layouts",
    parentId: "routes/dashboard/private-route",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/dashboard/dashboard": {
    id: "routes/dashboard/dashboard",
    parentId: "routes/dashboard/layouts",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/dashboard/profile/profile": {
    id: "routes/dashboard/profile/profile",
    parentId: "routes/dashboard/dashboard",
    path: "personal",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/dashboard/add-product/add-product": {
    id: "routes/dashboard/add-product/add-product",
    parentId: "routes/dashboard/dashboard",
    path: "add-product",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/dashboard/table-data/table-data": {
    id: "routes/dashboard/table-data/table-data",
    parentId: "routes/dashboard/dashboard",
    path: "product",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/not-found": {
    id: "routes/not-found",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};

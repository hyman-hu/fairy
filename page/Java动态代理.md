##Java动态代理
> Java动态代理机制的出现，使得 Java 开发人员不用手工编写代理类，只要简单地指定一组接口及委托类对象，便能动态地获得代理类。代理类会负责将所有的方法调用分派到委托对象上反射执行，在分派执行的过程中，开发人员还可以按需调整委托类对象及其功能，这是一套非常灵活有弹性的代理框架。下面我们开始动态代理的学习。
####简要说明
- 在java的动态代理机制中，有两个重要的类或接口，一个是 InvocationHandler(Interface)、另一个则是 Proxy(Class)。
- InvocationHandler(interface)的描述：
    - 每一个动态代理类都必须要实现InvocationHandler这个接口，并且每个代理类的实例都关联到了一个handler，当我们通过代理对象调用 一个方法的时候，这个方法的调用就会被转发为由InvocationHandler这个接口的 invoke 方法来进行调用。我们来看看InvocationHandler这个接口的唯一一个方法 invoke 方法：
    - `Object invoke(Object proxy, Method method, Object[] args) throws Throwable`
        - proxy： 指代我们所代理的那个真实对象
        - method： 指代的是我们所要调用真实对象的方法的Method对象
        - args： 指代的是调用真实对象某个方法时接受的参数
        - 返回的Object是指真实对象方法的返回类型
- Proxy(Class)的描述：
    - Proxy这个类的作用就是用来动态创建一个代理对象。我们经常使用的是newProxyInstance这个方法：
    - `public static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces,  InvocationHandler h)  throws IllegalArgumentException`
        - 一个ClassLoader对象，定义了由哪个ClassLoader对象来对生成的代理对象进行加载
        - 一个Interface对象的数组，表示的是我将要给我需要代理的对象提供一组什么接口
        - 一个InvocationHandler对象，表示的是当我这个动态代理对象在调用方法的时候，会关联到哪一个InvocationHandler对象上
        - 返回结果的理解： 一个代理对象的实例
- 反射概念：
    - 反射机制就是可以把一个类,类的成员(函数,属性),当成一个对象来操作,希望读者能理解,也就是说,类,类的成员,我们在运行的时候还可以动态地去操作他们.
- 动态代理实现步骤
    - 具体步骤是：
        - a. 实现InvocationHandler接口创建自己的调用处理器
        - b. 给Proxy类提供ClassLoader和代理接口类型数组创建动态代理类
        - c. 以调用处理器类型为参数，利用反射机制得到动态代理类的构造函数
        - d. 以调用处理器对象为参数，利用动态代理类的构造函数创建动态代理类对象             
    - <pre>
        // InvocationHandlerImpl 实现了 InvocationHandler 接口，并能实现方法调用从代理类到委托类的分派转发  
        // 其内部通常包含指向委托类实例的引用，用于真正执行分派转发过来的方法调用  
        InvocationHandler handler = new InvocationHandlerImpl(..);   
          
        // 通过 Proxy 为包括 Interface 接口在内的一组接口动态创建代理类的类对象  
        Class clazz = Proxy.getProxyClass(classLoader, new Class[] { Interface.class, ... });   
          
        // 通过反射从生成的类对象获得构造函数对象  
        Constructor constructor = clazz.getConstructor(new Class[] { InvocationHandler.class });   
          
        // 通过构造函数对象创建动态代理类实例  
        Interface Proxy = (Interface)constructor.newInstance(new Object[] { handler });   
      </pre>
    - eg:
    - <pre>
               // 动态代理
               ClassLoader classLoader = Interface.class.getClassLoader();
               Class<?>[] interfaces = new Class[] { Interface.class };
               InvocationHandler handler = new DynamicProxyHandler(realObject);
               Interface proxy = (Interface) Proxy.newProxyInstance(classLoader, interfaces, handler);
       
               System.out.println("in dynamicproxyMain proxy: " + proxy.getClass());
               consumer(proxy);    
      </pre>          
- 动态代理优点：
    - 动态代理与静态代理相比较，最大的好处是接口中声明的所有方法都被转移到调用处理器一个集中的方法中处理（InvocationHandler.invoke）。这样，在接口方法数量比较多的时候，我们可以进行灵活处理，而不需要像静态代理那样每一个方法进行中转。在本示例中看不出来，因为invoke方法体内嵌入了具体的外围业务（记录任务处理前后时间并计算时间差），实际中可以类似Spring AOP那样配置外围业务。
- 动态代理缺点：
    - 诚然，Proxy 已经设计得非常优美，但是还是有一点点小小的遗憾之处，那就是它始终无法摆脱仅支持 interface 代理的桎梏，因为它的设计注定了这个遗憾。回想一下那些动态生成的代理类的继承关系图，它们已经注定有一个共同的父类叫 Proxy。Java 的继承机制注定了这些动态代理类们无法实现对 class 的动态代理，原因是多继承在 Java 中本质上就行不通。         
    
###枚举
- enum这个关键字，可以理解为跟class差不多，这也个单独的类。
- 里面有属性，有构造方法，有getter，也可以有setter，但是一般都是构造传参数。还有其他自定义方法。那么在这些东西前面的，以逗号隔开的，最后以分号结尾的，这部分叫做，这个枚举的实例。
- 也可以理解为，class  new 出来的实例对象。这下就好理解了。只是，class，new对象，可以自己随便new，想几个就几个，而这个enum关键字，他就不行，他的实例对象，只能在这个enum里面体现。也就是说，他对应的实例是有限的。这也就是枚举的好处了，限制了某些东西的范围，举个栗子：一年四季，只能有春夏秋冬，你要是字符串表示的话，那就海了去了，但是，要用枚举类型的话，你在enum的大括号里面把所有的选项，全列出来，那么这个季节的属性，对应的值，只能在里面挑。不能有其他的。

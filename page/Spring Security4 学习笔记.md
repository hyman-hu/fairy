##Spring Security4 学习笔记

####Spring Security是什么?
- Spring Security提供了基于Java EE的企业应用软件全面的安全服务。
- 它提供了一组可以在Spring应用上下文中配置的Bean，充分利用了Spring IoC，DI（控制反转Inversion of Control ,DI:Dependency Injection 依赖注入）和AOP（面向切面编程）功能。

####基础说明
- 1.注解 **@EnableWebSecurity**
	- 该注解和 @Configuration 注解一起使用, 注解 WebSecurityConfigurer 类型的类，或者利用@EnableWebSecurity 注解继承 WebSecurityConfigurerAdapter的类，这样就构成了 Spring Security 的配置。
	- @EnableWebSecurity 注解将会启用Web安全功能。
- 2.抽象类 **WebSecurityConfigurerAdapter**
	- WebSecurityConfigurerAdapter 提供了一种便利的方式去创建 WebSecurityConfigurer的实例，只需要重写 WebSecurityConfigurerAdapter 的方法，即可配置拦截什么URL、设置什么权限等安全控制。
	- 创建类SecurityConfiguration继承WebSecurityConfigurerAdapter，来对我们应用中所有的安全相关的事项（所有url，验证用户名密码，表单重定向等）进行控制。
	- <pre>
	configure(WebSecurity) 通过重载，配置Spring Security的Filter链
	configure(HttpSecurity) 通过重载，配置如何通过拦截器保护请求
	configure(AuthenticationManagerBuilder) 通过重载，配置user-detail服务 
	</pre>
- 3.方法 **configure(AuthenticationManagerBuilder auth)** 和 **configure(HttpSecurity http) **
- 4.类 **AuthenticationManagerBuilder** 
	- AuthenticationManagerBuilder 用于创建一个 AuthenticationManager，让我能够轻松的实现内存验证、LADP验证、基于JDBC的验证、添加UserDetailsService、添加AuthenticationProvider。

####基于数据库表用户存储认证
- 通常我们都会将用户数据存储在关系型数据库中，并通过jdbc进行访问。spring security使用以jdbc为支撑的用户存储，我们可以使用下面的方式进行配置。
- <pre>
/**
     * 配置user-detail服务
     * @param auth
     * @throws Exception
     */
    @Override
    public void configure(AuthenticationManagerBuilder auth)throws Exception{
        //基于数据库的用户存储、认证
        auth.jdbcAuthentication().dataSource(dataSource)
                .usersByUsernameQuery("select account,password,true from user where account=?")
                .authoritiesByUsernameQuery("select account,role from user where account=?")；
    }
  </pre>

####配置自定义的用户存储认证
- 这种方式更为灵活，更适合在生产环境使用。这种方式不在局限于存储环境。自定义的方式也很简单。只需要提供一个UserDetailService接口实现即可。
- <pre>
@Service
public class SecurityUserDetailsService implements UserDetailsService{

    @Autowired
    private UserDao userDao;

    /**
     * 校验用户
     * @param username
     * @return
     * @throws UsernameNotFoundException
     */
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userDao.queryByUserName(username);
        if(user == null)throw new UsernameNotFoundException("user not found");

        return new org.springframework.security.core.userdetails.User(user.getAccount(),user.getPassword(),userDao.getUserGrantedAuthoritys(user.getId()));
    }
	}
  </pre>

####密码加密策略
- 通常我们在存储密码的时候都是进行加密的，spring security默认提供了三种密码存储方式，同时也可以使用自定义的加密方式：

	- NoOpPasswordEncoder 明文方式保存
	- BCtPasswordEncoder 强hash方式加密
	- StandardPasswordEncoder SHA-256方式加密
	- 实现PasswordEncoder接口 自定义加密方式
- <pre>
   /**
     * 配置user-detail服务
     * @param auth
     * @throws Exception
     */
    @Override
    public void configure(AuthenticationManagerBuilder auth)throws Exception{
        //基于数据库的用户存储、认证
        auth.jdbcAuthentication().dataSource(dataSource)
                .usersByUsernameQuery("select account,password,true from user where account=?")
                .authoritiesByUsernameQuery("select account,role from user where account=?")
                .passwordEncoder(NoOpPasswordEncoder.getInstance());
    }
  </pre> 

####请求拦截策略
- spring security的请求拦截匹配有两种风格，ant风格和正则表达式风格。编码方式是通过重载configure(HttpSecurity)方法实现。
- <pre>
  	/**
     * 拦截请求
     * @param http
     * @throws Exception
     */
    @Override
    public void configure(HttpSecurity http)throws Exception{
        http.authorizeRequests()
                .antMatchers("/","/css/**","/js/**").permitAll()   //任何人都可以访问
                .antMatchers("/admin/**").access("hasRole('ADMIN')")     //持有user权限的用户可以访问
                .antMatchers("/user/**").hasAuthority("ROLE_USER");
    }
  </pre>
- 保护请求方法
- <pre>
    access(String)     如果给定的SpEL表达式计算结果为true，就允许访问
	anonymous()        允许匿名用户访问
	authenticated()    允许认证过的用户访问
	denyAll()          无条件拒绝所有访问
	fullyAuthenticated()   如果用户是完整认证的话（不是通过Remember-me功能认证的），就允许访问
	hasAnyAuthority(String...)   如果用户具备给定权限中的某一个的话，就允许访问
	hasAnyRole(String...)   如果用户具备给定角色中的某一个的话，就允许访问
	hasAuthority(String)   如果用户具备给定权限的话，就允许访问
	hasIpAddress(String)   如果请求来自给定IP地址的话，就允许访问
	hasRole(String)   如果用户具备给定角色的话，就允许访问
	not()   对其他访问方法的结果求反
	permitAll()   无条件允许访问
	rememberMe()   如果用户是通过Remember-me功能认证的，就允许访问
  </pre>
- 通常我们都是使用http发送数据，这种方式是不安全的。对于敏感信息我们通常都是通过https进行加密发送。spring security对于安全性通道也提供了一种方式。我们可以在配置中添加requiresChannel()方法使url强制使用https。
- <pre>
	/**
     * 拦截请求
     * @param http
     * @throws Exception
     */
    @Override
    public void configure(HttpSecurity http)throws Exception{
        http.authorizeRequests()
                .antMatchers("/","/css/**","/js/**").permitAll()   //任何人都可以访问
                .antMatchers("/admin/**").access("hasRole('ADMIN')")     //持有user权限的用户可以访问
                .antMatchers("/user/**").hasAuthority("ROLE_USER")
                .and()
                .requiresChannel().antMatchers("/admin/info").requiresSecure();
    }
  </pre>
	- 只要是对“/admin/info”的请求，spring security都认为需要安全性通道，并自动将请求重定向到https上。
	
	- 与之相反，如果有些请求不需要https传送，可以使用requiresInsecure()替代requiresSecure()，将请求声明为始终使用http传送。
- 防止CSRF
	- spring security从版本3.2开始，默认就会启用CSRF防护。spring security通过一个同步token的方式来实现CSRF防护功能。它会拦截状态变化的请求，并检查CSRF token。如果请求中不包含CSRF token的话，或者token不能与服务器端的token匹配，请求就会失败，并抛出CsrfException异常。
	- 这样就spring security就会自动生成csrf token。如果想关闭csrf防护，需要作的也很简单，只需要调用一下csrf().disable();即可。
	- <pre>
		/**
     * 拦截请求
     * @param http
     * @throws Exception
     */
    @Override
    public void configure(HttpSecurity http)throws Exception{
        http.authorizeRequests()
                .antMatchers("/","/css/**","/js/**").permitAll()   //任何人都可以访问
                .antMatchers("/admin/**").access("hasRole('ADMIN')")     //持有user权限的用户可以访问
                .antMatchers("/user/**").hasAuthority("ROLE_USER")
                .and().csrf().disable();
    }
     </pre> 
- remember-me功能
	- remember-me是一个很重要的功能，用户肯定不希望每次都输入用户名密码进行登录。spring security提供的remember-me功能使用起来非常简单。启用这个功能只需要调用rememberMe()方法即可。
	- <pre>
	 	/**
     * 拦截请求
     * @param http
     * @throws Exception
     */
    @Override
    public void configure(HttpSecurity http)throws Exception{
        http.authorizeRequests()
                .antMatchers("/","/css/**","/js/**").permitAll()   //任何人都可以访问
                .antMatchers("/admin/**").access("hasRole('ADMIN')")     //持有user权限的用户可以访问
                .antMatchers("/user/**").hasAuthority("ROLE_USER")
                .and().rememberMe().key("abc").rememberMeParameter("remember_me").rememberMeCookieName("my-remember-me").tokenValiditySeconds(86400)；
    }
      </pre>

####自定义登录页面
- spring security会提供一个默认的登录页面，如果你想使用自己的登录页面，可以这样设置。
	- <pre>
	/**
     * 拦截请求
     * @param http
     * @throws Exception
     */
    @Override
    public void configure(HttpSecurity http)throws Exception{
        http.authorizeRequests()
                .antMatchers("/","/css/**","/js/**").permitAll()   //任何人都可以访问
                .antMatchers("/admin/**").access("hasRole('ADMIN')")     //持有user权限的用户可以访问
                .antMatchers("/user/**").hasAuthority("ROLE_USER")
                .and().formLogin()
                .loginPage("/login").usernameParameter("username").passwordParameter("password")
                .and().exceptionHandling().accessDeniedPage("/loginfail");
    }
      </pre>	
	- 通过formLogin()方法来设置使用自定义登录页面，loginPage是登录页面地址，accessDeniePage登录失败跳转地址。
	
####handling Logouts
- 与配置登录功能类似，您也有各种选项来进一步定制您的注销需求：
- <pre>
	protected void configure(HttpSecurity http) throws Exception {
	http
		.logout()                                                                
			.logoutUrl("/my/logout")                                                 
			.logoutSuccessUrl("/my/index")                                           
			.logoutSuccessHandler(logoutSuccessHandler)                              
			.invalidateHttpSession(true)                                             
			.addLogoutHandler(logoutHandler)                                         
			.deleteCookies(cookieNamesToClear)                                       
			.and()
		...
}
  </pre>
import useAuth from '../../shared/useAuth';
import useAxiosSecure from '../../shared/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faCoins, faMugHot, faTruck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { useEffect } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export default function AdminHome() {

  const { user } = useAuth();
  console.log(user);
  const [axiosSecure] = useAxiosSecure();

  const { data: userData = [] } = useQuery({
    queryKey: ['userData', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData/${user.email}`)
      return res.data;
    }
  })
  // console.log(userData);

  const { data: stats = [] } = useQuery({
    queryKey: ['admin-state'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-state');
      return res.data;
    }
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ['order-state'],
    queryFn: async () => {
      const res = await axiosSecure.get('/order-state');
      return res.data;
    }
  })

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };


  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map(data => {
    return { name: data.catagory, value: data.revenue }
  })
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Admin Home</title>
      </Helmet>
      <div className="pt-12">
        <div className="md:ml-20 md:mr-20">
          <div className="divider divider-primary"><h1 className="text-4xl font-bold" data-aos="zoom-out">{userData.displayName ? userData.displayName : 'USER PROFILE'}</h1></div>
        </div>
        <div className="md:ml-72 md:mr-72 mt-8">
          <div className="divider divider-secondary italic" data-aos="zoom-in"><p>•→ Welcome back to Bistro Boss Restaurant ←•</p></div>
        </div>
      </div>



      {/* ------>>>>> Desktop Version Statistics <<<<<------ */}
      <div className="hidden md:block text-center pt-8">
        <div className="stats shadow">
          <div className="stat" data-aos="fade-left">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon className="hidden md:block" icon={faCoins} size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">REVENUE</div>
            <div className="stat-value">${stats.revenue}</div>
            <div className="stat-desc">We are ready to serve your foods</div>
          </div>

          <div className="stat" data-aos="fade-left">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon className="hidden md:block" icon={faUsers} size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">CUSTOMERS</div>
            <div className="stat-value">{stats.users}</div>
            <div className="stat-desc mt-3">Offer and discounts are comming soon</div>
          </div>

          <div className="stat" data-aos="zoom-out">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faBurger} size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">PRODUCTS</div>
            <div className="stat-value">
              <div className="stat-value">{stats.menuItems}</div>
            </div>
            <div className="stat-desc mt-3">Pay first to enjoy your foods</div>
          </div>

          <div className="stat" data-aos="fade-right">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faMugHot} size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">PENDING ORDER</div>
            <div className="stat-value">
              <div className="stat-value">{stats.pendingOrder}</div>
            </div>
            <div className="stat-desc mt-3">Pay first to enjoy your foods</div>
          </div>

          <div className="stat" data-aos="fade-right">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faTruck} size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">COMPLETED ORDER</div>
            <div className="stat-value">
              <div className="stat-value">{stats.completedOrders}</div>
            </div>
            <div className="stat-desc mt-3">Pay first to enjoy your foods</div>
          </div>

        </div>
      </div>



      {/* ------>>>> Mobile version statistics <<<<------ */}
      <div className="text-center md:hidden pt-12 pb-12">
        <div className="stats stats-vertical shadow">
          <div className="stat" data-aos="fade-left">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faCoins} size="2xl" fade style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">REVENUE</div>
            <div className="stat-value">${stats.revenue}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat" data-aos="fade-left">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faUsers} fade size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">CUSTOMERS</div>
            <div className="stat-value">{stats.users}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat" data-aos="zoom-out">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faBurger} fade size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">PRODUCT</div>
            <div className="stat-value">
              <div className="stat-value">{stats.menuItems}</div>
            </div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat" data-aos="fade-right">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faMugHot} fade size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">PENDING ORDER</div>
            <div className="stat-value">
              <div className="stat-value">{stats.pendingOrder}</div>
            </div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat" data-aos="fade-right">
            <div className="stat-figure text-secondary">
              <FontAwesomeIcon icon={faTruck} fade size="2xl" style={{ color: "#FFD43B", }} />
            </div>
            <div className="stat-title">COMPLETED ORDER</div>
            <div className="stat-value">
              <div className="stat-value">{stats.completedOrders}</div>
            </div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
      </div>

      {/* ------->>>> Mobile Version Chart <<<<------- */}
      <div className='md:hidden'>
        <div>
          <BarChart
            width={400}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="catagory" />
            <YAxis />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="p-12">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>


      {/* ------->>>> Mobile Version Chart <<<<------- */}
      <div className='hidden md:grid md:grid-cols-2'>
        <div>
          <BarChart
            width={400}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="catagory" />
            <YAxis />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="p-12">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>


    </div>
  )
}

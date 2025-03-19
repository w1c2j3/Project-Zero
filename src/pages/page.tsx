// src/app/page.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { authState, platformState, platformActions } from '../states/auth';
import './page.module.sass';

const HomePage: React.FC = () => {
  const auth = useSnapshot(authState);
  const platform = useSnapshot(platformState);

  useEffect(() => {
    // Fetch characters on page load
    platformActions.fetchCharacters();
  }, []);

  return (
    <div className="home">
      {/* Hero Section with Professional Introduction */}
      <div className="home__hero">
        <div className="home__hero-content">
          <h1 className="home__title">个人简介</h1>
          <h2 className="home__subtitle">AI & 全栈开发工程师</h2>
          <p className="home__description">
            我是一名专注于人工智能和全栈开发的软件工程师，拥有丰富的前后端开发经验。
            热衷于创建具有创新交互体验的应用程序，将最新的AI技术融入到实际项目中。
          </p>
          <div className="home__buttons">
            <Link to="/platform" className="button button--primary">
              查看我的作品
            </Link>
            <a href="#contact" className="button button--outline">
              联系我
            </a>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="home__section home__skills">
        <div className="home__section-container">
          <h2 className="home__section-title">专业技能</h2>

          <div className="home__skills-grid">
            <div className="home__skills-category">
              <h3 className="home__skills-heading">前端开发</h3>
              <ul className="home__skills-list">
                <li className="home__skills-item">
                  <span className="home__skills-name">React</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '90%' }}></div>
                  </div>
                </li>
                <li className="home__skills-item">
                  <span className="home__skills-name">TypeScript</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '85%' }}></div>
                  </div>
                </li>
                <li className="home__skills-item">
                  <span className="home__skills-name">Sass/SCSS</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '80%' }}></div>
                  </div>
                </li>
                <li className="home__skills-item">
                  <span className="home__skills-name">函数式编程</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '85%' }}></div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="home__skills-category">
              <h3 className="home__skills-heading">后端开发</h3>
              <ul className="home__skills-list">
                <li className="home__skills-item">
                  <span className="home__skills-name">Rust</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '75%' }}></div>
                  </div>
                </li>
                <li className="home__skills-item">
                  <span className="home__skills-name">Node.js</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '80%' }}></div>
                  </div>
                </li>
                <li className="home__skills-item">
                  <span className="home__skills-name">数据库设计</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '85%' }}></div>
                  </div>
                </li>
                <li className="home__skills-item">
                  <span className="home__skills-name">API开发</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '90%' }}></div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="home__skills-category">
              <h3 className="home__skills-heading">AI & 机器学习</h3>
              <ul className="home__skills-list">
                <li className="home__skills-item">
                  <span className="home__skills-name">大语言模型</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '85%' }}></div>
                  </div>
                </li>
                <li className="home__skills-item">
                  <span className="home__skills-name">Python</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '80%' }}></div>
                  </div>
                </li>
                <li className="home__skills-item">
                  <span className="home__skills-name">TensorFlow/PyTorch</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '75%' }}></div>
                  </div>
                </li>
                <li className="home__skills-item">
                  <span className="home__skills-name">AI应用集成</span>
                  <div className="home__skills-bar">
                    <div className="home__skills-progress" style={{ width: '90%' }}></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="home__section home__experience">
        <div className="home__section-container">
          <h2 className="home__section-title">工作经历</h2>

          <div className="home__timeline">
            <div className="home__timeline-item">
              <div className="home__timeline-date">2022 - 至今</div>
              <div className="home__timeline-content">
                <h3 className="home__timeline-title">资深全栈开发工程师</h3>
                <h4 className="home__timeline-company">科技创新有限公司</h4>
                <p className="home__timeline-description">
                  负责公司核心产品的前后端开发，应用最新的AI技术提升用户体验。主导了多个重要项目，使用React、TypeScript进行前端开发，Rust构建高性能后端服务。
                </p>
                <ul className="home__timeline-achievements">
                  <li>设计并实现了公司AI对话平台，提高用户互动率45%</li>
                  <li>优化了后端服务架构，减少了30%的响应时间</li>
                  <li>开发了自动化测试流程，提高了代码质量和团队效率</li>
                </ul>
              </div>
            </div>

            <div className="home__timeline-item">
              <div className="home__timeline-date">2019 - 2022</div>
              <div className="home__timeline-content">
                <h3 className="home__timeline-title">前端开发工程师</h3>
                <h4 className="home__timeline-company">互联网服务公司</h4>
                <p className="home__timeline-description">
                  作为前端团队核心成员，负责公司多个产品的用户界面开发和优化。使用React、Redux和TypeScript构建响应式Web应用。
                </p>
                <ul className="home__timeline-achievements">
                  <li>重构了公司主要产品的前端架构，提高了开发效率</li>
                  <li>实现了多个复杂交互组件，获得了用户的积极反馈</li>
                  <li>参与制定了团队的前端开发规范和最佳实践</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="home__section home__projects">
        <div className="home__section-container">
          <h2 className="home__section-title">项目展示</h2>

          <div className="home__projects-grid">
            {platform.characters.slice(0, 3).map(character => (
              <Link
                key={character.id}
                to={`/platform?character=${character.id}`}
                className="home__project-card"
              >
                <div className="home__project-image-container">
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="home__project-image"
                  />
                </div>
                <div className="home__project-content">
                  <h3 className="home__project-title">{character.name}</h3>
                  <p className="home__project-description">{character.description}</p>
                  <div className="home__project-tags">
                    <span className="home__project-tag">React</span>
                    <span className="home__project-tag">TypeScript</span>
                    <span className="home__project-tag">AI</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="home__projects-more">
            <Link to="/platform" className="button button--outline">查看更多项目</Link>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="home__section home__education">
        <div className="home__section-container">
          <h2 className="home__section-title">教育背景</h2>

          <div className="home__education-item">
            <div className="home__education-year">2015 - 2019</div>
            <div className="home__education-content">
              <h3 className="home__education-degree">计算机科学与技术 学士学位</h3>
              <h4 className="home__education-school">知名大学</h4>
              <p className="home__education-description">
                主修计算机科学，专注于算法、数据结构和软件工程。参与多个研究项目，获得优异成绩。
              </p>
            </div>
          </div>

          <div className="home__education-item">
            <div className="home__education-year">2019 - 2021</div>
            <div className="home__education-content">
              <h3 className="home__education-degree">人工智能与机器学习 硕士学位</h3>
              <h4 className="home__education-school">知名大学</h4>
              <p className="home__education-description">
                专注于深度学习和自然语言处理研究。毕业论文题目为《大语言模型在交互式应用中的应用研究》。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="home__section home__contact">
        <div className="home__section-container">
          <h2 className="home__section-title">联系我</h2>

          <div className="home__contact-grid">
            <div className="home__contact-info">
              <div className="home__contact-item">
                <div className="home__contact-icon">
                  <i className="icon-email"></i>
                </div>
                <h3 className="home__contact-title">电子邮箱</h3>
                <p className="home__contact-value">example@example.com</p>
              </div>

              <div className="home__contact-item">
                <div className="home__contact-icon">
                  <i className="icon-phone"></i>
                </div>
                <h3 className="home__contact-title">电话</h3>
                <p className="home__contact-value">+86 123 4567 8910</p>
              </div>

              <div className="home__contact-item">
                <div className="home__contact-icon">
                  <i className="icon-location"></i>
                </div>
                <h3 className="home__contact-title">地址</h3>
                <p className="home__contact-value">中国，北京</p>
              </div>

              <div className="home__contact-social">
                <a href="#" className="home__contact-social-link">微博</a>
                <a href="#" className="home__contact-social-link">GitHub</a>
                <a href="#" className="home__contact-social-link">LinkedIn</a>
              </div>
            </div>

            <div className="home__contact-form-container">
              <form className="home__contact-form">
                <div className="home__form-group">
                  <label htmlFor="name" className="home__form-label">姓名</label>
                  <input type="text" id="name" className="home__form-input" placeholder="请输入您的姓名" />
                </div>

                <div className="home__form-group">
                  <label htmlFor="email" className="home__form-label">邮箱</label>
                  <input type="email" id="email" className="home__form-input" placeholder="请输入您的邮箱" />
                </div>

                <div className="home__form-group">
                  <label htmlFor="message" className="home__form-label">留言</label>
                  <textarea id="message" className="home__form-textarea" placeholder="请输入您的留言" rows={5}></textarea>
                </div>

                <button type="submit" className="home__form-submit button button--primary">发送留言</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;// src/app/page.tsx